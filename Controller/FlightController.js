// start
const router = require("express").Router();
let Flight = require("../Models/Flight");
//reading from csv file stuff
const csv = require("csv-parser");
const fs = require("fs");

//first run to import csv file into db
// fs.createReadStream("Flights.csv")
//   .pipe(csv())
//   .on("data", (row) => {
//     date = row.FlightDate.split("-").reverse().join("-");
//     console.log(date);
//     const FlightNumber = row.ID;
//     const Cabin = row.Cabin;
//     const SeatsAvailable = row.Seats;
//     const ArrivalDate = new Date(date);
//     const DepartureDate = new Date(date);
//     const DepartureAirport = row.From;
//     const ArrivalAirport = row.To;

//     const newFlight = new Flight({
//       FlightNumber,
//       Cabin,
//       SeatsAvailable,
//       ArrivalDate,
//       DepartureDate,
//       DepartureAirport,
//       ArrivalAirport,
//     });

//     newFlight.save();
//   })
//   .on("end", () => {
//     console.log("CSV file successfully processed");
//   });

//beginning of flight methods

//../flights -> this returns all lists in Flight collection
router.route("/").get((req, res) => {
  Flight.find()
    .then((flights) => res.json(flights))
    .catch((err) => res.status(400).json("Error: " + err));
});

// --/flights/createflight -> this creates a new flight object and adds it to Flight collection

router.route("/CreateFlight").post((req, res) => {
  const FlightNumber = req.body.FlightNumber;
  const Cabin = req.body.Cabin;
  const SeatsAvailable = req.body.SeatsAvailable;
  const ArrivalDate = req.body.ArrivalDate;
  const DepartureDate = req.body.DepartureDate;
  const DepartureAirport = req.body.DepartureAirport;
  const ArrivalAirport = req.body.ArrivalAirport;

  const newFlight = new Flight({
    FlightNumber,
    Cabin,
    SeatsAvailable,
    ArrivalDate,
    DepartureDate,
    DepartureAirport,
    ArrivalAirport,
  });

  newFlight
    .save()
    .then(() => res.json("Flight added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//../flights/deleteFlight
router.route("/DeleteFlight").get((req, res) => {
  Flight.findByIdAndDelete(id, function (err) {
    if (err) console.log(err);
    console.log("Flight deleted successfully");
  });
});

//../flights/UpdateFlight
router.route("/UpdateFlight").post((req, res) => {
  Flight.findByIdAndUpdate(
    id,
    { FlightNumber: req.body.FlightNumber,Cabin : req.body.Cabin, SeatsAvailable : req.body.SeatsAvailable,
      ArrivalDate : req.body.ArrivalDate,DepartureDate : req.body.DepartureDate, DepartureAirport : req.body.DepartureAirport,
      ArrivalAirport = req.body.ArrivalAirport
    },
    function (err) {
      if (err) console.log(err);
      console.log("Flight updated successfully");
    }
  );
});

//..flights/deleteAll
router.route("/DeleteAll").get((req, res) => {
  Flight.deleteMany({ DepartureDate: "2015-03-25" }, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
  });
});

//end of flight methods
module.exports = router;
