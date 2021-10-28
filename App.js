// External variables
const express = require("express");
const mongoose = require('mongoose');

const MongoURI ='mongodb+srv://admin:1234@airline.qxh8k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


//App variables
const app = express();
const port = process.env.PORT || "3000";
// #Importing the userController
const flightsCont = require('./Controller/FlightController');



const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// configurations
// Mongo DB

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


app.get("/", (req, res) => {
    res.status(200).send("Test Lab Task 1 !");
  });


app.use('/Flights', flightsCont);
/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
