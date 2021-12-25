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

router.post("/email", async (req, res) => {
  const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    service:"hotmail",
    auth:{
        user:"flightsawy@outlook.com",//Email Address
        pass:"ACLawyyy",//password

    }
});
const options = {
    from:"flightsawy@outlook.com",
    to:req.body.email,
    subject:req.body.subject,
    text:req.body.text
};
transporter.sendMail(options,function(err,info){
    if(err){
        console.log(err);
        return;
    }
    console.log("Sent :"+info.response);
})



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
    to: req.body.token.email,
    subject: "Payment Received",
    text:
      "Your payment of  " +
      req.body.product.price +
      "$ was successfully processed. Please check your Reserved Flights tab to see changes made.",
  };
  console.log(req.body);
  const { product, token } = req.body;

  return stripe.customers
    .create({
      email: req.body.token.email,
      source: "tok_visa",
    })
    .then((customer) => {
      stripe.charges.create({
        amount: product.price + "00",
        currency: "USD",
        customer: customer.id,
        description: "paying for flight reservation",
      });
    })
    .then((result) => res.status(200).send(result))
    .then(
      Purchase.findOneAndUpdate(
        product.PurchaseBody,
        { Paid: true },
        function (err) {
          if (err) console.log(err);
          console.log("Purchase updated successfully");
          console.log(req.body.id);

          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log("error!", err);
              return;
            }
            console.log("mail sent successfully");
            console.log(req.body);
          });
        }
      )
    )
    .catch((err) => console.log(err));
});
router.route("/CreatePurchase").post((req, res) => {
  const UserID = mongoose.Types.ObjectId(req.body.UserID);
  const NumberOfTickets = req.body.NumberOfTickets;
  const TotalPrice = req.body.TotalPrice;
  const Tickets = req.body.Tickets;
  const Paid = req.body.Paid;
  const newPurchase = new Purchase({
    UserID,
    NumberOfTickets,
    TotalPrice,
    Tickets,
    Paid,
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

router.route("/modifyTicket").post((req, res) => {
  //const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  Ticket.findByIdAndUpdate(req.body.ticketID, req.body, function (err) {
    if (err) console.log(err);
    console.log("Ticket updated successfully");
    console.log(req.body.id);
  });
  res.send();
});

router.route("/modifyPurchase").post((req, res) => {
  //const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  Purchase.findByIdAndUpdate(req.body.purchaseID, req.body, function (err) {
    if (err) console.log(err);
    console.log("Purchase updated successfully");
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
