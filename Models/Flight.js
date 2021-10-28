const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const flightSchema = new Schema({
  FlightNumber: {
    type: String,
    required: true,
  },
  Cabin: {
    type: String,
    required: true,
  },
  SeatsAvailable: {
    type: Number,
    required: true
  },
  ArrivalDate: {
    type: Date,
    required: true
  },
  DepartureDate: {
    type: Date,
    required: true
  },
  DepartureAirport: {
    type: String,
    required: true
  },
  ArrivalAirport: {
    type: String,
    required: true
  },
  
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;