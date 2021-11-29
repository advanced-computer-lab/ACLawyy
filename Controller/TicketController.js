const router = require("express").Router();
let Ticket = require("../Models/Ticket");
let Flight = require("../Models/Flight");
let User = require("../Models/User");
const mongoose = require("mongoose");

router.route("/CreateTicket").post((req, res) => {
  const UserID = mongoose.Types.ObjectId(req.body.UserID);
  const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  const ReturnFlight = mongoose.Types.ObjectId(req.body.ReturnFlight);
  const AwayCabin = req.body.AwayCabin;
  const ReturnCabin = req.body.ReturnCabin;
  const AwayPrice = req.body.AwayPrice;
  const ReturnPrice = req.body.ReturnPrice;
  const Type = req.body.Type;

  const newTicket = new Ticket({
    UserID,
    AwayFlight,
    ReturnFlight,
    AwayCabin,
    ReturnCabin,
    AwayPrice,
    ReturnPrice,
    Type,
  });

  newTicket
    .save()
    .then(() => res.json("Ticket Created!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/ChooseSeat").post((req, res) => {
  Ticket.findByIdAndUpdate(req.body._id, req.body.SeatNumber, function (err) {
    if (err) console.log(err);
    console.log("Ticket updated successfully");
    console.log(req.body.id);
  });
  res.send();
});

router.route("/findMyTickets").post((req, res) => {
  const UserID = mongoose.Types.ObjectId(req.body.UserID);
  const sort = { created_at: -1 }
  Ticket.find({UserID}).sort('-createdAt').exec((err, docs) => res.json(docs));
   
});

router.route("/getUserDetails").post((req, res) => {
  const UserID = mongoose.Types.ObjectId(req.body.UserID);
  User.find({UserID})
    .then((flight) => res.json(flight))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getAwayDetails").post((req, res) => {
  //const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  Flight.findById(req.body.AwayFlight)
    .then((flight) => res.json(flight))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getReturnDetails").post((req, res) => {
  //const AwayFlight = mongoose.Types.ObjectId(req.body.ReturnFlight);
  Flight.findById(req.body.ReturnFlight)
    .then((flight) => res.json(flight))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/DeleteTicket").post((req, res) => {
  Ticket.findByIdAndDelete(req.body._id, function (err) {
    if (err) console.log(err);
    console.log("Ticket deleted successfully");
  });
  res.send();
});

module.exports = router;
