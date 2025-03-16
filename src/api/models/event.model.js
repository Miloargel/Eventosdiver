const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    description: { type: String, required: true },
    dates: { type: [Date], required: true },
    ubication: { type: String, required: true },
    users: { type : [Schema.Types.ObjectId], ref: "User", required: true}
  },
  {
    collection: 'eventos',
  }
);

const Events = mongoose.model('Eventos', eventSchema);
module.exports = Events;
