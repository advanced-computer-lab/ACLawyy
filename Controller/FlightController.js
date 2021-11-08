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
//     // date = row.FlightDate.split("-").reverse().join("-");
//     // console.log(date);
//     const FlightNumber = row.ID;
//     const Cabin = row.Cabin;
//     const SeatsAvailable = row.Seats;
//     const ArrivalDate = row.FlightDate;
//     const DepartureDate = row.FlightDate;
//     const DepartureAirport = row.From;
//     const ArrivalAirport = row.To;
//     const DepartureTime = row.DepartureTime;
//     const ArrivalTime = row.ArrivalTime;

//     const newFlight = new Flight({
//       FlightNumber,
//       Cabin,
//       SeatsAvailable,
//       ArrivalDate,
//       DepartureDate,
//       DepartureAirport,
//       ArrivalAirport,
//       DepartureTime,
//       ArrivalTime,
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

//..flights/search -> returns all flights with specific search criteria
router.route("/Search").post((req, res) => {
  Flight.find(req.body)
    .then((flights) => res.json(flights))
    .catch((err) => res.status(400).json("Error: " + err));
});
//..flights/search -> returns all flights with specific search criteria
// router.route("/SearchNoDate").post((req, res) => {
//   console.log(req.body);
//   console.log(req.body.FlightNumber == true);
//   console.log(req.body.FlightNumber);
//   Flight.find(
//     req.body
//     // _id: req.body.id,
//     // FlightNumber: req.body.FlightNumber,
//     // Cabin: req.body.Cabin,
//     // DepartureAirport: req.body.DepartureAirport,
//     // ArrivalAirport: req.body.ArrivalAirport,
//   )
//     .then((flights) => res.json(flights))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/Search2").get((req, res) => {
  date = new Date("2022-02-21").toISOString();
  console.log(date);
  Flight.find({
    FlightNumber: { $regex: "" },
    Cabin: { $regex: "" },
    //ArrivalDate: "2022-02-20" + "T22:00:00.000Z",
    //DepartureDate: "2022-02-20" + "T22:00:00.000Z",
    DepartureAirport: { $regex: "" },
    ArrivalAirport: { $regex: "" },
  })
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
  const DepartureTime = req.body.DepartureTime;
  const ArrivalTime = req.body.ArrivalTime;

  const newFlight = new Flight({
    FlightNumber,
    Cabin,
    SeatsAvailable,
    ArrivalDate,
    DepartureDate,
    DepartureAirport,
    ArrivalAirport,
    DepartureTime,
    ArrivalTime,
  });

  newFlight
    .save()
    .then(() => res.json("Flight added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//../flights/deleteFlight
router.route("/DeleteFlight").post((req, res) => {
  Flight.findByIdAndDelete(req.body.id, function (err) {
    if (err) console.log(err);
    console.log("Flight deleted successfully");
  });
});

// ****** Try to turn into json obj *********
//../flights/UpdateFlight
router.route("/UpdateFlight").post((req, res) => {
  Flight.findByIdAndUpdate(
    req.body.id,
    {
      FlightNumber: req.body.FlightNumber,
      Cabin: req.body.Cabin,
      SeatsAvailable: req.body.SeatsAvailable,
      ArrivalDate: req.body.ArrivalDate,
      DepartureDate: req.body.DepartureDate,
      DepartureAirport: req.body.DepartureAirport,
      ArrivalAirport: req.body.ArrivalAirport,
      DepartureTime: req.body.DepartureTime,
      ArrivalTime: req.body.ArrivalTime,
    },
    function (err) {
      if (err) console.log(err);
      console.log("Flight updated successfully");
    }
  );
});

//..flights/deleteAll
router.route("/DeleteAll").get((req, res) => {
  Flight.deleteMany({}, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion of all");
  });
});

//end of flight methods
module.exports = router;
