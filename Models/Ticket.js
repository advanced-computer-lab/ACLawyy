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
        type: Double,
        required: true,
      },
      ReturnPrice: {
          type: Double,
          required: true,
        },
      AwaySeat: {
        type: Integer,
        required: false,
      },
      ReturnSeat: {
          type: Integer,
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
