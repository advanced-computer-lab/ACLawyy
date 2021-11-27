const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const flightSchema = new Schema(
  {
    FlightNumber: {
      type: Number,
      required: true,
    },
    ArrivalDate: {
      type: String,
      required: true,
    },
    DepartureDate: {
      type: String,
      required: true,
    },
    DepartureAirport: {
      type: String,
      required: true,
    },
    ArrivalAirport: {
      type: String,
      required: true,
    },
    DepartureTime: {
      type: String,
      required: true,
    },
    ArrivalTime: {
      type: String,
      required: true,
    },



    DepartureCity: {
      type: String,
      required: true,
    },
    ArrivalCity: {
      type: String,
      required: true,
    },
    BaggageAllowance: {
      type: Number ,
      required: true,
    },
    FirstClassSeats: {
      type: Number ,
      required: true,
    },
    FirstClassSeatsAvailable: {
      type: Array ,
      required: true,
    },
    BusinessClassSeats: {
      type: Number ,
      required: true,
    },
    BusinessClassSeatsAvailable: {
      type: Array ,
      required: true,
    },
    EconomyClassSeats: {
      type: Number ,
      required: true,
    },
    BusinessClassSeatsAvailable: {
      type: Array ,
      required: true,
    },
    EconomyPrice: {
      type: Number ,
      required: true,
    },
    
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
