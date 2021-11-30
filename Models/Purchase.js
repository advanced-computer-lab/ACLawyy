const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const purchaseSchema = new Schema(
  {
    UserID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Tickets: {
      type: Array,
      required: false,
    },
    NumberOfTickets: {
      type: Number,
      required: true,
    },
    TotalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
