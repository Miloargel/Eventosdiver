const mongoose = require('mongoose');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Espera 10 segundos antes de fallar
    });
  } catch (error) {
    process.exit(1); // Cierra el proceso en caso de error
  }
};

module.exports = connectDB;