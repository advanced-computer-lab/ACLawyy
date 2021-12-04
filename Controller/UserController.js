// #Task route solution
const router = require("express").Router();
let User = require("../Models/User");
router.route("/UpdateUser").post((req, res) => {
  User.findByIdAndUpdate("61a53ad5cbfb061456411e90", req.body, function (err) {
    if (err) console.log(err);
    console.log("User updated successfully");
  });
  res.send();
});
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/getTA").get((req, res) => {
  User.find({ Job: /TA/ })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/getUserDetails").get((req, res) => {
  User.findById("61a53ad5cbfb061456411e90")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
}); 
router.route("/SearchEmail").post((req, res) => {
  User.find({
    Email:req.body.Email
      })
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Method that inserted the Administrator
// router.route("/setAdmin").get((req, res) => {
//   User.create({ Username: "Administrator", Password: "1234" })
//     .then(() => res.json("User added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/add").post((req, res) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const HomeAddress = req.body.HomeAddress;
  const CountryCode = req.body.CountryCode;
  const TelephoneNumbers = req.body.TelephoneNumbers;
  const Email = req.body.Email;
  const PassportNumber = req.body.PassportNumber;
  const Username = req.body.Username;
  const Password = req.body.Password;

  const newUser = new User({
    Name,
    FirstName,
    LastName,
    HomeAddress,
    CountryCode,
    TelephoneNumbers,
    Email,
    PassportNumber,
    Email,
    Username,
    Password,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
