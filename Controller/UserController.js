// #Task route solution
const router = require("express").Router();
let User = require("../Models/User");

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
router.route("/Login").post(async (req, res) => {
  try {
    const {Username,Password} = req.body
    const user = await User.findOne({ Username: Username });
    console.log(user)
    if (user.Password !== Password) {
      return res.status(403).json("Wrong Password!")
    }
    
    return res.status(200).json({message: "This is an admin"})
  } catch (error) {
    console.log(error)
  }
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
