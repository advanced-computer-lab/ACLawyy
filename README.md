# Airline Reservation System: ACLawyy


## Flights Awy
Our project is a Website implemented using MERN stack that helps Airlines be more accessible online and through it, an admin manages the available flights from one end and the user is able to search and view the available flight to book his/her desirable flights from the other end . 

## Motivation 
Our project aims to create a smooth experience for both the manager and the client of Airline Systems, and in such a pandemic, online reservations have become very essential and important. Hence, to accomplish our Advanced Computer Lab project, our team followed the proposed requirements to produce this final product. 

## Table of Content 
### 1. Key Functionalities 
### 2. Backend Structure 
### 3. How to Use the project 
### 4. How the routing is done
### 5. Installations 
### 6. License 

## Key Functionalities 
The following Functionalities will be covered in this unit:

We differentiate between the 3 views of the website through a different Navbar that allows access to different functionalities based on the type of person accessing the website. 

There exists 3 different types that access our website:  

#### 1. Admin Point of View 
- One signed in Admin has access to the Admin Side of the website 
-Admin Home Page displays the analytics of the purchases and the flights
- The Admin has access to a list of all the available flights without any search criteria in the Manage Flights Section, this schedule gets updated each time the Admin modifies it.
- The Admin can Create flights including all its details such as flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport.
- The Admin can update (edit) any selected flight and its details including flight number, departure and arrival times, number of available Economy seats, number of Business Class seats, dates and airports.
- The Admin is able to delete any selected flights and all their details upon confirmation.



#### 2. Guest User Point of View
- Guest user has access to the Home page which has many traveling offers, loyalty club membership, and most importantly a mini search. 
- Through the Mini Search, the Guest User can search using only departure and arrival cities to look for the available flights in our system. 
- The Guest User can access the FAQ Section: the Frequently Asked Questions
- The Guest User can Sign up or sign in through the Navbar 
- Through the Book a flight section in the Navbar, The guest user can search now through a detailed search engine, where he/she specifies the departure and arrival cities alongside with the desired departure/arrival airports, desirable dates, desirable cabin and number of passengers. 
- The guest user can then choose from the proposed available flight cards which include all the flight details. 
- If the Guest user proceeds to reserve a certain ticket. He/she is directed to sign up or sign in First, because Reservations are only available for registered users. 
 


#### 3. Existing User Point of View 
- The Signed in User has all functionalities as the Guest user, except the Sign up/Sign in option is replaced with User Icon and a log out option 
- Through the User Icon, the Registered User can view and edit all their details, including changing their password, the user then receives a confirmation mail that their profile has been updated. 
- When the registered user proceeds to reserve a ticket, he has an option to pay online  right away using their credit card, or they can pay later. 
- In the Reserved flights section, the user has an itinerary of their reserved tickets, and they can choose their designated seats. 
- In the Reserved flights section, the User can pay for the tickets.
- In the Reserved flights section, the User can edit the inbound or the outbound flight or the chosen seat. 
- Finally, The User is able to delete a booking and is notified by mail of the cancellation and the amount to be refunded. 

## Backend Structure

Before we dive into the detailed functionalities, let's take a look on our database schema and our controllers. 
### Collections in our Database:
#### 1. User Schema
- Contains the user details including: First name, last Name, Home Address, Country Code, Telephone Numbers, Email, Passport Number, Username and password 
- Contains the user type to differentiate between the Admin and the regular User when logging in. 
- By default the Sign up form renders regular users, under the assumption that we have only a single admin. 

#### 2. Flight Schema 
- Contains the flight details including: flight number, arrival date, departure date, departure airport, arrival airport, departure time, arrival time, departure city, arrival city, baggage allowance, first class seats, business class seats, economy seats.
- Contains arrays for , first class seats available, business class seats available, economy seats available to keep track of the reserved and the available seats on the flights
- Contains the price for the economy cabin only, and the prices of the other cabin types and the child price are calculated by multiplying the basic price by a certain factor. 

#### 3. Ticket Schema 
- Each Ticket contains the ID of the registered user that reserved it. 
- In our system, our ticket constitutes a roundtrip
- Hence the schema contains information such as: the ID of the away flight , the ID of the return flight, away cabin, return cabin, away price, return price, away seat, return seat. 
- Ticket Schema also contains the ticket type, that indicates whether the ticket owner is an adult or a child. 

#### 4. Purchase Schema 
- Since a user can book for different number of passengers with different types, the purchase schema holds the information of each booking the user makes. 
- Each purchase contains the ID of the user who made the purchase. 
- Each purchase indicates the number of tickets purchased and contains an array of their tickets details. 
- Each purchase has a total price for all the purchased tickets
- Each purchase has a state of paid or not paid yet. 

### Backend Methods 
To make changes in the database, the following methods are called to connect between the front end and the backend using Axios API. These methods are distributed in 3 controllers: 
#### 1. User Controller 
- Register a new user
```javascript
router.route("/register").post(async (req, res) => {
  const user = req.body;
  console.log(user)
  const takenUserName = await User.findOne({Username: user.Username});
  const takenEmail = await User.findOne({Email : user.Email});
console.log(takenUserName);
console.log(takenEmail);
  if(takenUserName ||takenEmail){
    res.json({message: "Username or Email Taken"})
  }else{
    user.Password = await bcrypt.hash(req.body.Password,10)
    const dbUser = new User({
      FirstName : user.FirstName,
      LastName : user.LastName,
      TelephoneNumbers: [user.TelephoneNumber],
      PassportNumber : user.PassportNumber,
      UserType : 1,
      Username : user.Username.toLowerCase(),
      Email: user.Email.toLowerCase(),
      Password: user.Password
    })

    dbUser.save()
    res.json(dbUser)
  }
  
});
```
- Login 
```javascript
router.route("/Login").post( (req, res) => {
    const userLoggingIn = req.body;
    User.findOne({ Username: userLoggingIn.Username })
    .then(dbUser=>{
      if(!dbUser){
        return res.json({
          message : "Invalid Username or Password"
        })
      }
      bcrypt.compare(userLoggingIn.Password, dbUser.Password)
      .then(isCorrect=>{
        if(isCorrect){
        const payload = {
          id :dbUser._id,

          username: dbUser.Username,
        }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {expiresIn :86400},
          (err,token)=>{
            if(err) return res.json({message:err})
            console.log("success")
            return res.json({
              message: "Success",
              token:"Bearer"+token,
              userID : dbUser._id,
              UserType : dbUser.UserType
            })
            
          }
        )

      } else{
        console.log("fashallllllliure ")
        return res.json({
          message: "Invalid Username or Password"
        })
      } 
    })
   })
 
});
```
- For updating the user info: Search Email, to check if this new email is already registered. and Search Username, to check if this new username is already taken. 

```javascript
router.route("/SearchEmail").post((req, res) => {
  User.find({
    Email: req.body.Email,
  })
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/SearchUsername").post((req, res) => {
  User.find({
    Username: req.body.Username,
  })
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});
```
- Update user 

```javascript
router.route("/UpdateUser").post((req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body, function (err) {
    if (err) console.log(err);
    console.log("User updated successfully");
  });
  res.send();
});
```

#### 2. Flights Controller 
- Returning all lists in the flights collection 
```javascript
router.route("/").get((req, res) => {
  Flight.find()
    .then((flights) => res.json(flights))
    .catch((err) => res.status(400).json("Error: " + err));
});
```
- Returning flights based on search criteria 
```javascript
router.route("/Search").post((req, res) => {
  Flight.find(req.body)
    .then((flights) => res.json(flights))
    .catch((err) => res.status(400).json("Error: " + err));
});
```
- Create a new flight 
```javascript
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
    .catch((err) => console.log(err));
});
```
- Update an existing flight
```javascript
router.route("/UpdateFlight").post((req, res) => {
  Flight.findByIdAndUpdate(req.body._id, req.body, function (err) {
    if (err) console.log(err);
    console.log("Flight updated successfully");
    console.log(req.body.id);
  });
  res.send();
});

``` 
- Delete an existing flight 
```javascript
router.route("/DeleteFlight").post((req, res) => {
  Flight.findByIdAndDelete(req.body._id, function (err) {
    if (err) console.log(err);
    console.log("Flight deleted successfully");
  });
  res.send();
});
```
- Delete all flights 
```javascript
router.route("/DeleteAll").get((req, res) => {
  Flight.deleteMany({}, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion of all");
  });
});
```

#### 3. Ticket Controller 
- Create a Ticket
```javascript

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

```
-Make payment and send confirmation mail 
```javascript
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
    subject: "Payment Confirmation",
    text:
      "Congratulations on your Purchase, Our team wishes you a great flight!! Your flight price was " +
      req.body.product.price / 100 +
      "$",
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

```

- Create a new purchase 
```javascript
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


```
- Choose Seat 
```javascript
router.route("/ChooseSeat").post((req, res) => {
  Ticket.findByIdAndUpdate(req.body._id, req.body.SeatNumber, function (err) {
    if (err) console.log(err);
    console.log("Ticket updated successfully");
    console.log(req.body.id);
  });
  res.send();
});

```
- Find my Purchases to show purchases for a specific user in a LIFO order 
```javascript
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

```
- Find my Seat in away and return flights 
```javascript
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
```
- Find my tickets to show tickets for a specific user in a LIFO order 
```javascript
router.route("/findMyTickets").post((req, res) => {
  const UserID = mongoose.Types.ObjectId(req.body.UserID);
  const sort = { created_at: -1 };
  Ticket.find(req.body)
    .sort("-createdAt")
    .exec((err, docs) => res.json(docs));
});
```
- To display User details on the boarding pass of ticket 
```javascript
router.route("/getAwayDetails").post((req, res) => {
  //const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  Flight.findById(req.body.AwayFlight)
    .then((flight) => res.json(flight))
    .catch((err) => res.status(400).json("Error: " + err));
});
```
- To Display Away and Return Flight's details on the boarding pass
```javascript 
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
```
- To modify the seats available upon selecting a seat 
```javascript
router.route("/modifySeatsAvailable").post((req, res) => {
  //const AwayFlight = mongoose.Types.ObjectId(req.body.AwayFlight);
  Flight.findByIdAndUpdate(req.body._id, req.body, function (err) {
    if (err) console.log(err);
    console.log("Seats updated successfully");
    console.log(req.body.id);
  });
  res.send();
});
```
- To edit the selected seat in return and away flights 
```javascript
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
```

- To delete a ticket from a purchase
```javascript
router.route("/DeleteTicket").post((req, res) => {
  Ticket.findByIdAndDelete(req.body._id, function (err) {
    if (err) console.log(err);
    console.log("Ticket deleted successfully");
  });
  res.send();
});
``` 
- to delete a whole purchase 
```javascript
router.route("/DeletePurchase").post((req, res) => {
  Purchase.findByIdAndDelete(req.body._id, function (err) {
    if (err) console.log(err);
    console.log("Purchase deleted successfully");
  });
  res.send();
});
```




 





## Detailed Functionalities
Now that we explored how our backend works, in the following section, we will present in detail how each functionality works from the frontend by going through each user journey. 

### 1. Admin Point of View 
Our only admin has a username of Admin and password admin. 
Admin in the backend is referred to as type 0 

By logging in as an admin, we route to the admin home where we can check all analytics of the website. 
![Admin Home]()
Then by clicking manage flights we face a list of all the created flights. 
![Table of flights]()
Above this table we Have 2 buttons 
- Search Button 
By clicking this button we access the block that allows us to enter our search criteria to display the desired flights in the table below. 
![Search Block Example]()
- Create Button 
By Clicking this button we access the block that allows us to Add a new flight to our table and when we refresh the page we can see that the flight is added successfully. 
![Create Block Example]()


### 2. Guest User Point of View 
Guest User is referred to as Type 2 

Anyone who clicks on our website is considered to be a guest user until they log in and then we part them into admin point of view versus a normal user point of view \
Through the Home of the guest user, he/she can search through the mini search in the home page or the  Book a flight tab with a more advanced search. 

![mini search]()

![advanced search]()

When we select the round trip, we can not proceed as a guest user any longer, we Have to Sign in or Sign up to access the booking features in our website. 

#### Sign Up, Sign In 
Through The guest user Navbar, We can either sign up or sign in
![Sign Up]()
![Sign In]()

### 3. Existing user Point of View 
Existing User is referred to as Type 1

The existing user can access All The features of the Guest User alongside other extra featured. 

The Existing user can Reserve the flights
![reserve from summary]()
The user is then directed to pay for the reservation on the spot. 
![make payment example]()

The user has the option to pay later if they click on the reserved flights tab. 

in the reserved flights tab, the user can access all their bookings and see an itinerary of all the tickets that they purchased. 
![example itinerary]()

Through this page the user can select seat by selecting the choose seat, which will redirect us to a choosing seats page, where the user could choose only from the booked cabin. 
![seats page]()

once they confirm, it brings the user back to the reserved flights page, where the seat will be changed to the chosen seat. 
![Seat chosen]()

The user can edit from this edit menu either the departure/arrival flights or the chosen seat 

![edit list]()

When the user clicks on the change flight option, we are faced with a pop over with all the available flights that they could choose from, once the user chooses a new flight it compares it to the other flight and if they already paid they make the payment difference on the spot. 
![change reserved flights]()

When changing the seat it simply redirects us to the same seating chart to select a different seat. 


Finally, The existing user can access their information through the profile icon in the navbar, where they access their profile and they can edit all their information except of the username through the edit button. 

![userpage]()












## Installation

Use the package manager [npm](https://www.npmjs.com/) to install mongoose, express, node, react, @mui/material, react-icons,  nodeMailer, jsonwebtoken, bcrypt, stripe, cors, axios, react-router-dom.

```bash
npm install node
npm install express
npm install mongoose
npm install react
npm install @mui/material
npm install react-icons
npm install nodeMailer 
npm install jsonwebtoken
npm install bcrypt
npm install stripe
npm install cors
npm install axios 
npm install react-router-dom
```

## Usage

```javascript

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Credits
### Resources 
[Code Academy Course: Learn ReactJS](https://www.codecademy.com/learn/react-101)

[React Documentation](https://reactjs.org/)

[MongoDB Schema Design Best Practices](https://www.mongodb.com/developer/article/mongodb-schema-design-best-practices/)


[MUI React Library](https://mui.com/)

[MERN Stack Authentication Tutorial](https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57)

### Team Members and Contributions 
#### Farida Helmy 46-1425
#### Sprint 1
database setup + viewing all flights
#### Sprint 2
Collaborating with Salma Kishk in Creating a new collection of Purchases, View reservation and Delete Reservation 
#### Sprint 3
Login and Registration and changing password 


#### Omar Hatem 46-2654
#### Sprint 1
searching with critereas in the flight list 
#### Sprint 2
searching and showing the mini and expanded view of the outbound and inbound flights
#### Sprint 3
Collaborating with Salma Kishk in Updating The flights, the seats, the purchases and the ticket 

#### Honey Mohamed 46-1492
#### Sprint 1
Creating flights
#### Sprint 2
Viewing and Assigning Seats for outbound and inbound flights
#### Sprint 3
Frontend The Home page, FAQ questions and the Admin view. 
 
#### Salma Kishk 46-2101
#### Sprint 1
update flights
#### Sprint 2
Collaborating with Farida Helmy in Creating a new collection of Purchases, View reservation and Delete Reservation 
#### Sprint 3
Collaborating with Omar Hatem in Updating The flights, the seats, the purchases and the ticket 

#### Mohamed Tantawi 46-2989
#### Sprint 1
delete flights
#### Sprint 2
Update User Details  
#### Sprint 3
Payment using Stripe. 


## License
[MIT](https://choosealicense.com/licenses/mit/)
