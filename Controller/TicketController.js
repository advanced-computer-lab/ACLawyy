const router = require("express").Router();
let Ticket = require("../Models/Ticket");
let Flight = require("../Models/Flight");
let User = require("../Models/User");
let Purchase = require("../Models/Purchase");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.secret);
router.route("/CreateTicket").post((req, res) => {
  const UserID = mongoose.Types.ObjectId(req.body.UserID);
  const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  const ReturnFlight = mongoose.Types.ObjectId(req.body.ReturnFlight);
  const AwayCabin = req.body.AwayCabin;
  const ReturnCabin = req.body.ReturnCabin;
  const AwayPrice = req.body.AwayPrice;
  const ReturnPrice = req.body.ReturnPrice;
  const AwaySeat = -1;
  const ReturnSeat = -1;
  const Type = req.body.Type;
  
  const newTicket = new Ticket({
    UserID,
    AwayFlight,
    ReturnFlight,
    AwayCabin,
    ReturnCabin,
    AwayPrice,
    ReturnPrice,
    AwaySeat,
    ReturnSeat,
    Type,
  });

  newTicket
    .save()
    .then(() => res.json("Ticket Created!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.post("/payment", async (req, res) => {
  const nodeMailer = require("nodemailer");
  const transporter = nodeMailer.createTransport({
    service: "hotmail",
    auth: {
      user: "flightsawy@outlook.com",
      pass: "ACLawyyy",
    },
  });
  const options = {
    from: "flightsawy@outlook.com",
    to: req.body.body.token.email,
    subject: "Payment Confirmation",
    text: "Congratulations on your Purchase, Our team wishes you a great flight!! Your flight price was "+req.body.body.product.price.substring(0,req.body.body.product.price.length-2)+"$",
  };
  console.log(req.body);
  const { product, token } = req.body;

  return stripe.customers
    .create({
      email: req.body.body.token.email,
      source: "tok_visa",
    })
    .then((customer) => {
      stripe.charges.create({
        amount: "5000",
        currency: "USD",
        customer: customer.id,
        description: "paying for flight reservation",
      });
    })
    .then((result) => res.status(200).send(result))
    .then(
      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log("error!", err);
          return;
        }
        console.log("mail sent successfully");
        console.log(req.body);
      })
    )
    .catch((err) => console.log(err));
});
router.route("/CreatePurchase").post((req, res) => {
  const UserID = mongoose.Types.ObjectId(req.body.UserID);
  const NumberOfTickets = req.body.NumberOfTickets;
  const TotalPrice = req.body.TotalPrice;
  const Tickets = req.body.Tickets;

  const newPurchase = new Purchase({
    UserID,
    NumberOfTickets,
    TotalPrice,
    Tickets,
  });

  newPurchase
    .save()
    .then(() => res.json("Purchase Created!"))
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
  const sort = { created_at: -1 };
  Ticket.find(req.body)
    .sort("-createdAt")
    .exec((err, docs) => res.json(docs));
});

router.route("/findMyPurchases").post((req, res) => {
  const UserID = mongoose.Types.ObjectId(req.body.UserID);
  const sort = { created_at: -1 };
  Purchase.find({ UserID })
    .sort("-createdAt")
    .exec((err, docs) => res.json(docs));
});

router.route("/getPurchase").post((req, res) => {
  //const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  Purchase.findById(req.body)
    .then((pur) => res.json(pur))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getUserDetails").post((req, res) => {
  User.findById(req.body.UserID)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getAwayDetails").post((req, res) => {
  //const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  Flight.findById(req.body.AwayFlight)
    .then((flight) => res.json(flight))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/modifySeatsAvailable").post((req, res) => {
  //const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  Flight.findByIdAndUpdate(req.body._id, req.body, function (err) {
    if (err) console.log(err);
    console.log("Seats updated successfully");
    console.log(req.body.id);
  });
  res.send();
});

router.route("/modifyAwaySeat").post((req, res) => {
  //include AwayFlight/UserID/AwaySeat=-1

  for (let i = 0; i < req.body.modifiedSeats.length; i++) {
    Ticket.findOneAndUpdate(
      req.body,
      { AwaySeat: req.body.modifiedSeats[i] },
      function (err) {
        if (err) console.log(err);
        console.log("Seats updated successfully");
        console.log(req.body);
      }
    );
    res.send();
  }
});

router.route("/findAwaySeat").post((req, res) => {
  Ticket.findById(req.body.ticketID)
    .then((ticket) => res.json(ticket))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/findReturnSeat").post((req, res) => {
  Ticket.findById(req.body.ticketID)
    .then((ticket) => res.json(ticket))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/modifyReturnSeat").post((req, res) => {
  //include AwayFlight/UserID/AwaySeat=undefined
  flightID = req.body.flightID;
  userID = req.body.userID;
  for (let i = 0; i < req.body.modifiedSeats.length; i++) {
    Ticket.findOneAndUpdate(
      req.body,
      { ReturnSeat: req.body.modifiedSeats[i] },
      function (err) {
        if (err) console.log(err);
        console.log("Seats updated successfully");
        console.log(req.body.id);
      }
    );
    res.send();
  }
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

router.route("/DeletePurchase").post((req, res) => {
  Purchase.findByIdAndDelete(req.body._id, function (err) {
    if (err) console.log(err);
    console.log("Purchase deleted successfully");
  });
  res.send();
});

module.exports = router;
