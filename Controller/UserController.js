
const router = require("express").Router();
let User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


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
router.route("/getUserDetails").post((req, res) => {
  User.findById(req.body.UserID)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});


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
            return res.json({
              message: "Success",
              token:"Bearer"+token,
            })
          }
        )

      } else{
        return res.json({
          message: "Invalid Username or Password"
        })
      } 
    })
   })
 
});

 //   console.log(user)
  //   if (user.Password !== Password) {
  //     return res.status(403).json("Wrong Password!")
  //   }
    
  //   return res.status(200).json({message: "This is an admin"})
  // } catch (error) {
  //   console.log(error)
  // }

// Method that inserted the Administrator
// router.route("/setAdmin").get((req, res) => {
//   User.create({ Username: "Administrator", Password: "1234" })
//     .then(() => res.json("User added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

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
      Username : user.Username.toLowerCase(),
      Email: user.Email.toLowerCase(),
      Password: user.Password
    })

    dbUser.save()
    res.json(dbUser)
  }
  
});

module.exports = router;
