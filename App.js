// External variables
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const MongoURI = process.env.DATABASE_URL;
var cors = require("cors");
//App variables
const app = express();
const port = process.env.PORT || "8000";
// #Importing the userController
const flightsCont = require("./Controller/FlightController");
const usersCont = require("./Controller/UserController");
const ticketsCont = require("./Controller/TicketController");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
// configurations
// Mongo DB

mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).send("hello world !");
});

app.use("/Flights", flightsCont);
app.use("/Users", usersCont);
app.use("/Tickets", ticketsCont);


/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

