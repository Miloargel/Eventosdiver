const mongoose = require ('mongoose');
const Events = require('../models/event.model');
const Users = require("../models/user.model")
const add = async (req, res) => {
  try {
    const newEvent = new Events(req.body);
    const createdEvent = await newEvent.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error en la operación', error: error.message });
;
  }
};

const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const event = req.body;

    // Asegurarnos de que el idU sea un ObjectId válido
    const userId = event.idU;

    // Verificar si el userId es válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'ID de usuario no válido' });
    }

    // Validar que el evento exista antes de actualizarlo
    const existingEvent = await Events.findById(id);
    if (!existingEvent) {
      return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    }

    // Agregar al usuario al evento
    const updatedEvent = await Events.findByIdAndUpdate(
      id,
      { $addToSet: { users: userId } },  // Agregar sin duplicados
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    console.error(error);  // Para detalles de errores
    res.status(500).json({ success: false, message: 'Error al actualizar el evento', error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Events.findByIdAndDelete(id);
    res.json(deletedEvent);
  } catch (error) {
    res.json(error);
  }
};

const getAll = async (req, res) => {
  try {
    const events = await Events.find().populate('users', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en la operación', error: error.message });
  }
};
const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const addUserToEvent = async (req, res) => {
  try {
    const { idE, idU } = req.body;

    // Verificar si los IDs son válidos
    if (!mongoose.Types.ObjectId.isValid(idE)) {
      return res.status(400).json({ success: false, message: 'ID de evento no válido' });
    }
    if (!mongoose.Types.ObjectId.isValid(idU)) {
      return res.status(400).json({ success: false, message: 'ID de usuario no válido' });
    }

    // Verificar si el evento y el usuario existen
    const event = await Events.findById(idE);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    }

    const user = await Users.findById(idU);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Verificar si el usuario ya está en el evento
    if (event.users.includes(idU)) {
      return res.status(400).json({ success: false, message: 'El usuario ya está agregado a este evento' });
    }

    // Agregar al usuario al evento
    const updatedEvent = await Events.findByIdAndUpdate(
      idE,
      { $addToSet: { users: idU } }, // Evitar duplicados
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error al agregar el usuario al evento',
      error: error.message,
    });
  }
};

module.exports = { add, updateEvent, deleteEvent, getAll, addUserToEvent, eventSchema };