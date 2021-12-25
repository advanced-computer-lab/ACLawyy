import "./UserPage.css";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import emailjs from "emailjs-com";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Rank from "./pigeon.png";
import CheckIcon from "@mui/icons-material/Check";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import ChangePassword from "../ChangePassword/ChangePassword";
import Alert from "@mui/material/Alert";
export function UserPage(props) {
  const [user, setUser] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userHomeAdress, setUserHomeAdress] = useState();
  const [userCountryCode, setUserCountryCode] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassportNumber, setUserPassportNumber] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled1, setIsDisabled1] = useState(true);
  const [isDisabled2, setIsDisabled2] = useState(true);
  const [isDisabled3, setIsDisabled3] = useState(true);
  const [isDisabled4, setIsDisabled4] = useState(true);
  const [isDisabled5, setIsDisabled5] = useState(true);
  const [isDisabled6, setIsDisabled6] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [newNumber, setNewNumber] = useState();
  const [showSuccess, setShowSuccess]= useState(false);
  const [showError, setShowError]= useState(false);
  const [textToDisplay,setTextToDisplay]=useState("Edit");
  const [disp,setDisp] = useState(true);
  useEffect(() => {
    axios
      .post("http://localhost:8000/Users/getUserDetails", {
        UserID: props.userID,
      })
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        alert("error");
      });
  }, [isLoading]);
  function handleSubmit() {
    sendFeedback("service_c3t9zmi", "template_fwz2z6b", {
      message: "This is a confirmation email.",
      to_name: user.FirstName,
      from_name: "Flights Awyy ;)",
      email: userEmail,
    });
  }
  function sendFeedback(serviceID, templateId, variables) {
    emailjs
      .send(serviceID, templateId, variables, "user_9PNzIckffJfZSC4iPp6I4")
      .then((res) => {
        console.log("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }
  function handleButton() {
    
    if(disp===true){
      setIsDisabled1(false);
      setIsDisabled2(false);
      setIsDisabled3(false);
      setIsDisabled4(false);
      setIsDisabled5(false);
      setIsDisabled6(false);
      setTextToDisplay("Update");
      
    }
    else{
      setIsLoading(true);
      setIsDisabled1(true);
      setIsDisabled2(true);
      setIsDisabled3(true);
      setIsDisabled4(true);
      setIsDisabled5(true);
      setIsDisabled6(true);
      
      setTextToDisplay("Edit");
    const newUser = JSON.parse(JSON.stringify(user));
    newUser.FirstName = userFirstName;
    newUser.LastName = userLastName;
    newUser.CountryCode = userCountryCode;
    newUser.Email = userEmail;
    newUser.HomeAdress = userHomeAdress;
    newUser.PassportNumber = userPassportNumber;
    // setUser(newUser);
    axios
      .post("http://localhost:8000/Users/SearchEmail", { Email: userEmail })
      .then((res) => {
        if (res.data.length === 0 || user.Email===userEmail) {
          setShowError(false);
          
          handleSubmit();
          axios
            .post("http://localhost:8000/users/updateUser", newUser)
            .then((res) => {
              //alert(JSON.stringify(user));
              setShowSuccess(true);
              setIsLoading(true);
            })
            .catch(() => {
              alert("error");
              setShowSuccess(false);
            });
        } else {
          setShowError(true);
        }
      })
      .catch(() => {
        alert("error");
      });
            
            
    
    }
    setDisp(!disp);
    setIsLoading(false);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleClose() {
    setShowSuccess(false);
    setAnchorEl(null);
  }
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  function handleClose2() {
    setAnchorEl2(null);
  }
  function handleDelete(event, index) {
    user.TelephoneNumbers.splice(index, 1);
    alert("Number Deleted");
  }
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  function handleButton1(event) {
    user.TelephoneNumbers.push(newNumber);
    setShowSuccess(true);
  }
  if (isLoading) {
    return <div className="UserPage">loading...</div>;
  }
  return (
    <div className="UserPage">
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"
      ></script>
      <script type="text/javascript">
        {function () {
          emailjs.init("user_9PNzIckffJfZSC4iPp6I4");
        }}
        ();
      </script>
      <div className="icons">
        <Avatar>{user.FirstName.charAt(0)}</Avatar>
      </div>
      <div className="Label">
        <Stack direction="column" spacing={1}>
          <FormLabel children={user.FirstName} />
          <FormLabel children="Age: 23" />
        </Stack>
      </div>
      <div className="DistanceTravelled">
        <Stack direction="row" spacing={1}>
          <FlightTakeoffIcon />
          <FormLabel children="Distance Travelled:4000 KM" />
        </Stack>
      </div>
      <div className="HoursFlown">
        <Stack direction="row" spacing={1}>
          <AccessTimeIcon />
          <FormLabel children="Hours Flown:27 H" />
        </Stack>
      </div>
      <div className="Rank">
        <img src={Rank} alt="Rank" height="130px" width="150px" />
      </div>

      <div class="vl"></div>

      <div className="biography">
        <Stack direction="column" spacing={10}>
          <Stack direction="row" spacing={15}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled1,
                }}
                focused={!isDisabled1}
                className="TextBox"
                id="outlined-required"
                label="First Name"
                defaultValue={user.FirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
              
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled2,
                }}

                focused={!isDisabled2}
                className="TextBox"
                id="outlined-required"
                label="Last Name"
                defaultValue={user.LastName}
                onChange={(e) => setUserLastName(e.target.value)}
              />
              
            </Stack>
          </Stack>
          <Stack direction="row" spacing={15}>
            <Stack direction="column" spacing={5}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled5,
                }}
                focused={!isDisabled5}
                className="TextBox"
                id="outlined-required"
                label="Email"
                defaultValue={user.Email}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              
             
          {showError && <Alert severity="error">This Email is already in Use!&nbsp; </Alert>}
            
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled4,
                }}
                focused={!isDisabled4}
                className="TextBox"
                id="outlined-required"
                label="Country Code"
                defaultValue={user.CountryCode}
                onChange={(e) => setUserCountryCode(e.target.value)}
              />
              
            </Stack>
            
          </Stack>
          
          <Stack direction="row" spacing={15}>
            <Stack direction="row" spacing={3}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled6,
                }}
                focused={!isDisabled6}
                className="TextBox"
                id="outlined-required"
                label="Passport Number"
                defaultValue={user.PassportNumber}
                onChange={(e) => setUserPassportNumber(e.target.value)}
              />
              
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled3,
                }}
                focused={!isDisabled3}
                className="TextBox-home"
                id="outlined-required"
                label="Home Adress"
                defaultValue={user.HomeAdress}
                onChange={(e) => setUserHomeAdress(e.target.value)}
              />
              
            </Stack>
          </Stack>
        </Stack>
        
        <Button className="Submit" variant="contained" onClick={handleButton}>
          {textToDisplay}
        </Button>
        <Button
          className="PopOver-mobile"
          variant="contained"
          onClick={handleClick}
        >
          View Mobile numbers
        </Button>
        <Button
          className="PopOver-changePass"
          variant="contained"
          onClick={handleClick2}
        >
          Change Password
        </Button>
        {showSuccess && <Alert severity="success">Profile Updated Successfuly!&nbsp; </Alert>}
        <div classname ="changePop"> 
        <Popover
          margin = "40 px"
          anchorPosition={{ top: 0, left: 0 }}
          open={open2}
          anchorEl={anchorEl2}
          onClose={handleClose2}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 230, left: 550 }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
        >
          <ChangePassword
            className="changePassword"
            UserID={user._id}
            Username={user.Username}
          />
        </Popover>
        <Popover
          anchorPosition={{ top: 0, left: 0 }}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <div className="mobilePopOut">
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Phone Numbers </h1>
            {user.TelephoneNumbers.map((Number, index) => (
              <div className="current-mobile">
                <TextField
                  width="100px"
                  InputProps={{
                    readOnly: true,
                  }}
                  className="TextBox-mob"
                  id="outlined-required"
                  label={"Mobile" + index}
                  defaultValue={Number}
                />
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon className="DeleteIcon" />
                </IconButton>
              </div>
            ))}
            <div className="current-mobile">
              <TextField
                width="100px"
                InputProps={{
                  readOnly: false,
                }}
                className="TextBox2"
                id="outlined-required"
                label="Add New Number"
                onChange={(e) => setNewNumber(e.target.value)}
                defaultValue={""}
              />

              <IconButton onClick={handleButton1}>
                <CheckIcon />
              </IconButton>
            </div>
            {showSuccess && (
              <Alert severity="success">
                Mobile Added Successfully!&nbsp;{" "}
              </Alert>
            )}
          </div>
        </Popover>
      </div>
    </div>
    </div>
  );
}

export default UserPage;
