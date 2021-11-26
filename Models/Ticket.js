const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    AwayFlight: {
      type: ObjectId,
      required: true,
    },
    ReturnFlight: {
        type: ObjectId,
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
      },
      ReturnSeat: {
          type: Number,
          required: false,
        },
      Type :{
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", userSchema);
module.exports = User;
