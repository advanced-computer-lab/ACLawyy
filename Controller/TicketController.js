const router = require("express").Router();
let Flight = require("../Models/Tickets");

router.route("/CreateTicket").post((req, res) => {
  const AwayFlight = req.body.AwayFlight;
  const ReturnFlight = req.body.ReturnFlight;
  const AwayCabin = req.body.AwayCabin;
  const ReturnCabin = req.body.ReturnCabin;
  const AwayPrice = req.body.AwayPrice;
  const ReturnPrice = req.body.ReturnPrice;
  const AgeGroup = req.body.AgeGroup;

  const newTicket = new Ticket({
    AwayFlight,
    ReturnFlight,
    AwayCabin,
    ReturnCabin,
    AwayPrice,
    ReturnPrice,
    AgeGroup,
  });

  newTicket
    .save()
    .then(() => res.json("Ticket Created!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/ChooseSeat").post((req, res) => {
  Tickets.findByIdAndUpdate(req.body._id, req.body.SeatNumber, function (err) {
    if (err) console.log(err);
    console.log("Ticket updated successfully");
    console.log(req.body.id);
  });
  res.send();
});
