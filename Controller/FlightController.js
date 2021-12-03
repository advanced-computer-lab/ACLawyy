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
//     dateArr = row.FlightDate.split("/");
//     date = dateArr[2]+ "-" + dateArr[0] + "-" + dateArr[1];

//     const FlightNumber = row.ID;
//     const ArrivalDate = date;
//     const DepartureDate = date;
//     const DepartureAirport = row.From;
//     const ArrivalAirport = row.To;
//     const DepartureTime = row.DepartureTime;
//     const ArrivalTime = row.ArrivalTime;
//     const DepartureCity = row.FromCity;
//     const ArrivalCity = row.ToCity;
//     const BaggageAllowance = row.Baggage;
//     const FirstClassSeats = row.FirstClassSeats;
//     const FirstClassSeatsAvailable=[];
//     for (let i=0; i<FirstClassSeats; i++) FirstClassSeatsAvailable.push(0);
//     const BusinessClassSeats = row.BusinessClassSeats;
//     const BusinessClassSeatsAvailable=[];
//     for (let i=0; i<BusinessClassSeats; i++) BusinessClassSeatsAvailable.push(0);
//     const EconomyClassSeats = row.EconomyClassSeats;
//     const EconomyClassSeatsAvailable = [];
//     for (let i=0; i<EconomyClassSeats; i++) EconomyClassSeatsAvailable.push(0);

//     const EconomyPrice = row.Price;

//     const newFlight = new Flight({
//       FlightNumber,
//       ArrivalDate,
//       DepartureDate,
//       DepartureAirport,
//       ArrivalAirport,
//       DepartureTime,
//       ArrivalTime,
//       DepartureCity,
//       ArrivalCity,
//       BaggageAllowance,
//       FirstClassSeats,
//       FirstClassSeatsAvailable,
//       BusinessClassSeats,
//       BusinessClassSeatsAvailable,
//       EconomyClassSeats,
//       EconomyClassSeatsAvailable,
//       EconomyPrice
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
//     const FlightNumber = row.ID;
//     const ArrivalDate = row.FlightDate;
//     const DepartureDate = row.FlightDate;
//     const DepartureAirport = row.From;
//     const ArrivalAirport = row.To;
//     const DepartureTime = row.DepartureTime;
//     const ArrivalTime = row.ArrivalTime;
//     const DepartureCity = DepartureAirport + " City";
//     const ArrivalCity = ArrivalAirport + " City";
//     const BaggageAllowance = row.Baggage;
//     const FirstClassSeats = row.FirstClassSeats;
//     const FirstClassSeatsAvailable=[];
//     for (let i=0; i<FirstClassSeats; i++) FirstClassSeatsAvailable.push(0);
//     const BusinessClassSeats = row.BusinessClassSeats;
//     const BusinessClassSeatsAvailable=[];
//     for (let i=0; i<BusinessClassSeats; i++) BusinessClassSeatsAvailable.push(0);
//     const EconomyClassSeats = row.EconomyClassSeats;
//     const EconomyClassSeatsAvailable = [];
//     for (let i=0; i<EconomyClassSeats; i++) EconomyClassSeatsAvailable.push(0);

//     const EconomyPrice = row.Price;

//     const newFlight = new Flight({
//       FlightNumber,
//       ArrivalDate,
//       DepartureDate,
//       DepartureAirport,
//       ArrivalAirport,
//       DepartureTime,
//       ArrivalTime,
//       DepartureCity,
//       ArrivalCity,
//       BaggageAllowance,
//       FirstClassSeats,
//       FirstClassSeatsAvailable,
//       BusinessClassSeats,
//       BusinessClassSeatsAvailable,
//       EconomyClassSeats,
//       EconomyClassSeatsAvailable,
//       EconomyPrice
//     });

//     newFlight.save();
//   })

router.route("/CreateFlight").post((req, res) => {
  const FlightNumber = req.body.FlightNumber;
  const ArrivalDate = req.body.ArrivalDate;
  const DepartureDate = req.body.DepartureDate;
  const DepartureAirport = req.body.DepartureAirport;
  const ArrivalAirport = req.body.ArrivalAirport;
  const DepartureTime = req.body.DepartureTime;
  const ArrivalTime = req.body.ArrivalTime;
  const DepartureCity = req.body.DepartureCity;
  const ArrivalCity = req.body.ArrivalCity;
  const BaggageAllowance = req.body.BaggageAllowance;
  const FirstClassSeats = req.body.FirstClassSeats;
  const FirstClassSeatsAvailable = [];
  for (let i = 0; i < FirstClassSeats; i++) FirstClassSeatsAvailable.push(0);
  const BusinessClassSeats = req.body.BusinessClassSeats;
  const BusinessClassSeatsAvailable = [];
  for (let i = 0; i < BusinessClassSeats; i++)
    BusinessClassSeatsAvailable.push(0);
  const EconomyClassSeats = req.body.EconomyClassSeats;
  const EconomyClassSeatsAvailable = [];
  for (let i = 0; i < EconomyClassSeats; i++)
    EconomyClassSeatsAvailable.push(0);

  const EconomyPrice = req.body.EconomyPrice;

  const newFlight = new Flight({
    FlightNumber,
    ArrivalDate,
    DepartureDate,
    DepartureAirport,
    ArrivalAirport,
    DepartureTime,
    ArrivalTime,
    DepartureCity,
    ArrivalCity,
    BaggageAllowance,
    FirstClassSeats,
    FirstClassSeatsAvailable,
    BusinessClassSeats,
    BusinessClassSeatsAvailable,
    EconomyClassSeats,
    EconomyClassSeatsAvailable,
    EconomyPrice,
  });

  newFlight
    .save()
    .then(() => res.json("Flight added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//../flights/deleteFlight
router.route("/DeleteFlight").post((req, res) => {
  Flight.findByIdAndDelete(req.body._id, function (err) {
    if (err) console.log(err);
    console.log("Flight deleted successfully");
  });
  res.send();
});

// ****** Try to turn into json obj *********
//../flights/UpdateFlight
router.route("/UpdateFlight").post((req, res) => {
  Flight.findByIdAndUpdate(req.body._id, req.body, function (err) {
    if (err) console.log(err);
    console.log("Flight updated successfully");
    console.log(req.body.id);
  });
  res.send();
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
