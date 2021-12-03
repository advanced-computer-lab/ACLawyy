const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    UserID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    AwayFlight: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ReturnFlight: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    AwayCabin: {
      type: String,
      required: true,
    },
    ReturnCabin: {
      type: String,
      required: true,
    },

    AwayPrice: {
      type: Number,
      required: true,
    },
    ReturnPrice: {
      type: Number,
      required: true,
    },
    AwaySeat: {
      type: Number,
      required: false,
      default:-1,
    },
    ReturnSeat: {
      type: Number,
      required: false,
      default:-1,
    },
    Type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
