// #Task route solution
const router = require('express').Router();
let Flight = require('../Models/Flight');

router.route('/').get((req, res) => {
  Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));

});
// router.route('/getTA').get((req, res) => {
//   Flight.find( {Job:/TA/})
//     .then(Flights => res.json(Flights))
//     .catch(err => res.status(400).json('Error: ' + err));
// });



router.route('/add').post((req, res) => {
  const FlightNumber = req.body.FlightNumber;
  const Cabin = req.body.Cabin;
  const SeatsAvailable = req.body.SeatsAvailable;
  const ArrivalDate = req.body.ArrivalDate;
  const DepartureDate = req.body.DepartureDate;
  const DepartureAirport = req.body.DepartureAirport;
  const ArrivalAirport = req.body.ArrivalAirport;
  

  const newFlight = new Flight({FlightNumber,
    Cabin,
    SeatsAvailable,
    ArrivalDate,
    DepartureDate,    
    DepartureAirport,
    ArrivalAirport});

  newFlight.save()
    .then(() => res.json('Flight added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;