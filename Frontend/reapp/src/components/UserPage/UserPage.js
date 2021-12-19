import "./UserPage.css";
import StripeCheckout from "react-stripe-checkout";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import emailjs from "emailjs-com";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
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
  const [newNumber, setNewNumber] = useState();
  const [product,setProduct] =useState({
    name:"Pay for reservation",
    price: "10",
    Productby:"ACLawyyy ;)"
    })

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
  }, []);
  function handleClickT1() {
    setIsDisabled1(false);
  }
  function handleClickF1() {
    setIsDisabled1(true);
    user.FirstName = userFirstName;
  }
  function handleClickT2() {
    setIsDisabled2(false);
  }
  function handleClickF2() {
    setIsDisabled2(true);
    user.LastName = userLastName;
  }
  function handleClickT3() {
    setIsDisabled3(false);
  }
  function handleClickF3() {
    setIsDisabled3(true);
    user.HomeAdress = userHomeAdress;
  }
  function handleClickT4() {
    setIsDisabled4(false);
  }
  function handleClickF4() {
    setIsDisabled4(true);
    user.CountryCode = userCountryCode;
  }
  function handleClickT5() {
    setIsDisabled5(false);
  }
  function handleClickF5() {
    axios
      .post("http://localhost:8000/Users/SearchEmail", { Email: userEmail })
      .then((res) => {
        if (res.data.length === 0) {
          setIsDisabled5(true);
          user.Email = userEmail;
          handleSubmit();
        } else {
          alert("Email in use!");
        }
      })
      .catch(() => {
        alert("error");
      });
  }
  function handleClickT6() {
    setIsDisabled6(false);
  }
  function handleClickF6() {
    setIsDisabled6(true);
    user.PassportNumber = userPassportNumber;
  }
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
    axios
      .post("http://localhost:8000/users/updateUser", user)
      .then((res) => {
        alert("Profile Updated");
      })
      .catch(() => {
        alert("error");
      });
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleClose() {
    setAnchorEl(null);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleDelete(event, index) {
    user.TelephoneNumbers.splice(index, 1);
    setAnchorEl(null);
    alert("Number Deleted");
  }
  const open = Boolean(anchorEl);
  function handleButton1(event) {
    user.TelephoneNumbers.push(newNumber);
    setAnchorEl(null);
    alert("Number Added");
  }
  function CheckEmail(Email) {}
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
      <div className="biography">
        <Stack direction="column" spacing={10}>
          <Stack direction="row" spacing={15}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled1,
                }}
                className="TextBox"
                id="outlined-required"
                label="First Name"
                defaultValue={user.FirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
              <IconButton onClick={handleClickT1}>
                <EditIcon className="EditIcon" />
              </IconButton>
              <IconButton onClick={handleClickF1}>
                <CheckIcon />
              </IconButton>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled2,
                }}
                className="TextBox"
                id="outlined-required"
                label="Last Name"
                defaultValue={user.LastName}
                onChange={(e) => setUserLastName(e.target.value)}
              />
              <IconButton onClick={handleClickT2}>
                <EditIcon className="EditIcon" />
              </IconButton>
              <IconButton onClick={handleClickF2}>
                <CheckIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={15}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled4,
                }}
                className="TextBox"
                id="outlined-required"
                label="Country Code"
                defaultValue={user.CountryCode}
                onChange={(e) => setUserCountryCode(e.target.value)}
              />
              <IconButton onClick={handleClickT4}>
                <EditIcon className="EditIcon" />
              </IconButton>
              <IconButton onClick={handleClickF4}>
                <CheckIcon />
              </IconButton>
            </Stack>
            {/* <StripeCheckout 
              stripeKey = "pk_test_51K8BI2DXNkUn4YuszggmHAuUflW7oYdM1B6qTgSdkKwBMSnbmbYfUIWREOch2oSPLkCOmOsldOkvW6am99Dc3skq00Xux5d3q4"
              token=""
              name=""
            >
              <Button style={{
                backgroundcolor:"pink",
                fontSize:"15px"
              }}>
              Make Payment
              </Button>
            </StripeCheckout>  */}
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled5,
                }}
                className="TextBox"
                id="outlined-required"
                label="Email"
                defaultValue={user.Email}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <IconButton onClick={handleClickT5}>
                <EditIcon className="EditIcon" />
              </IconButton>
              <IconButton onClick={handleClickF5}>
                <CheckIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={15}>
            <Stack direction="row" spacing={3}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled6,
                }}
                className="TextBox"
                id="outlined-required"
                label="Passport Number"
                defaultValue={user.PassportNumber}
                onChange={(e) => setUserPassportNumber(e.target.value)}
              />
              <IconButton onClick={handleClickT6}>
                <EditIcon className="EditIcon" />
              </IconButton>
              <IconButton onClick={handleClickF6}>
                <CheckIcon />
              </IconButton>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isDisabled3,
                }}
                className="TextBox"
                id="outlined-required"
                label="Home Adress"
                defaultValue={user.HomeAdress}
                onChange={(e) => setUserHomeAdress(e.target.value)}
              />
              <IconButton onClick={handleClickT3}>
                <EditIcon className="EditIcon" />
              </IconButton>
              <IconButton onClick={handleClickF3}>
                <CheckIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        <Button className="Submit" variant="contained" onClick={handleButton}>
          Update
        </Button>
        <Button className="PopOver" variant="contained" onClick={handleClick}>
          View Mobile numbers
        </Button>
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
          <div className="realPopOut">
            <Typography>Phonenumbers </Typography>
            <Typography>
              -------------------------------------------------------------------------------------------------------------------------------------------------
            </Typography>
            {user.TelephoneNumbers.map((Number, index) => (
              <Stack direction="row" spacing={2}>
                <TextField
                  className="popUps"
                  width="100px"
                  InputProps={{
                    readOnly: true,
                  }}
                  className="TextBox"
                  id="outlined-required"
                  label={"Mobile" + index}
                  defaultValue={Number}
                />
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon className="DeleteIcon" />
                </IconButton>
              </Stack>
            ))}
            <Stack>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: false,
                }}
                className="TextBox"
                id="outlined-required"
                label="New Number"
                onChange={(e) => setNewNumber(e.target.value)}
              />
              <Button variant="contained" onClick={handleButton1}>
                Add new PhoneNumber
              </Button>
            </Stack>
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default UserPage;
