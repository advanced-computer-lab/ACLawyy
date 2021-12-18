import "./Booking.css";
import BoardingPass from "./BoardingPass";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgTrash } from "react-icons/cg";
import Button from "@mui/material/Button";
import emailjs from "emailjs-com";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
function Booking(props) {
  // const purchase = props.purchase;
  // const tickets = props.Tickets;
  const { number, tickets, price, userID, _id } = props.p;
  const message ="Booking Cancelled ,you will be refunded with the amount of " + props.p.TotalPrice + "$";
  const [user, setUser] = useState(null);
  const [awayFlight, setAwayFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:8000/Tickets/getUserDetails", {
        UserID: props.UserID,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  }, []);

  useEffect(() => {
    if (props.p.Tickets != undefined && props.p.Tickets != null) {
      console.log(props.p.Tickets);
      axios
        .post("http://localhost:8000/Tickets/getReturnDetails", {
          ReturnFlight: props.p.Tickets[0].ReturnFlight,
        })
        .then((res) => {
          console.log(JSON.stringify(res.data));
          setReturnFlight(res.data);
        })
        .catch((err) => console.log("Error: " + err));
      axios
        .post("http://localhost:8000/Tickets/getAwayDetails", {
          AwayFlight: props.p.Tickets[0].AwayFlight,
        })
        .then((res) => {
          console.log(JSON.stringify(res.data));
          setAwayFlight(res.data);
        })
        .catch((err) => console.log("Error: " + err));
    }
  }, []);

  function handleSubmit() {
    sendFeedback("service_c3t9zmi", "template_fwz2z6b", {
      message: message,
      to_name: user.FirstName,
      from_name: "Flights Awyy ;)",
      email: user.Email,
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

  const handleDelete=()=>{

    const con = window.confirm("Are you sure you want to cancel this purchase?");
    if (con){

      handleDeleteBackEnd();
      handleSubmit();
      window.alert("Your purchase has been cancelled, please check your email to see the refunded amount");
      }


  }

 const handleDeleteBackEnd = () => {
    console.log(props.p.Tickets);
    console.log(props.p.Tickets[0]);
    console.log(props.p.Tickets[0]._id);
    const realAwaySeats = [];
    const realReturnSeats = [];


    console.log(props.p.Tickets);
    for (let i = 0; i < props.p.Tickets.length; i++) {
      axios
        .post("http://localhost:8000/Tickets/findAwaySeat", {
          ticketID: props.p.Tickets[i]._id,
        })
        .then((res) => {

          console.log(res.data);
          console.log(res.data.AwaySeat);
          realAwaySeats.push(res.data.AwaySeat);
          realReturnSeats.push(res.data.ReturnSeat);

          axios
            .post("http://localhost:8000/Tickets/DeleteTicket", {
              _id: props.p.Tickets[i]._id,
            })
            .then((res) => {
              console.log("ticket deleted nicely");
              if (i ==props.p.Tickets.length-1 ) {
                
      axios
      .post("http://localhost:8000/Tickets/DeletePurchase", {
        _id: props.p._id,
      })
      .then((res) => {
        console.log("purchase deleted smoothly or nicely");
  




      })
      .catch((err) => console.log("Error: " + err));


      var seatsAvailable1 = [];
      var seatsAvailable2 = [];

      const flight1update = { _id: awayFlight._id };
      if (props.p.Tickets[0].AwayCabin === "first") {
        flight1update.FirstClassSeats =
          awayFlight.FirstClassSeats + props.p.NumberOfTickets;
          seatsAvailable1 = [...awayFlight.FirstClassSeatsAvailable];
        for (let i = 0; i < realAwaySeats.length; i++) {
          if (realAwaySeats[i] != -1) {
            seatsAvailable1[realAwaySeats[i]] = 0;
          }
        }
        flight1update.FirstClassSeatsAvailable = seatsAvailable1;
      }
      if (props.p.Tickets[0].AwayCabin === "business") {
        flight1update.BusinessClassSeats =
          awayFlight.BusinessClassSeats + props.p.NumberOfTickets;
          seatsAvailable1 = [...awayFlight.BusinessClassSeatsAvailable];
        for (let i = 0; i < realAwaySeats.length; i++) {
          if (realAwaySeats[i] != -1) {

            seatsAvailable1[realAwaySeats[i]] = 0;
          }
        }
        flight1update.BusinessClassSeatsAvailable = seatsAvailable1;
      } else {
        flight1update.EconomyClassSeats =
          awayFlight.EconomyClassSeats + props.p.NumberOfTickets;
        seatsAvailable1 = [...awayFlight.EconomyClassSeatsAvailable];
        for (let i = 0; i < realAwaySeats.length; i++) {
          if (realAwaySeats[i] != -1) {
            seatsAvailable1[realAwaySeats[i]] = 0;
          }
        }
        flight1update.EconomyClassSeatsAvailable = seatsAvailable1;
        console.log("seats avail 1 " + seatsAvailable1);
      }
      axios
        .post("http://localhost:8000/flights/updateflight", flight1update)
        .then((res) => {
          const flight2update = { _id: returnFlight._id };
          if (props.p.Tickets[0].ReturnCabin === "first") {
            flight2update.FirstClassSeats =
              returnFlight.FirstClassSeats + props.p.NumberOfTickets;
              seatsAvailable2 = [...returnFlight.FirstClassSeatsAvailable];
            for (let i = 0; i < realReturnSeats.length; i++) {
              if (realReturnSeats[i] != -1) {
    
                seatsAvailable2[realReturnSeats[i]] = 0;
              }
            }
            flight2update.FirstClassSeatsAvailable = seatsAvailable2;
          }
          if (props.p.Tickets[0].ReturnCabin === "business") {
            flight2update.BusinessClassSeats =
              returnFlight.BusinessClassSeats + props.p.NumberOfTickets;
              seatsAvailable2 = [...returnFlight.BusinessClassSeatsAvailable];
            for (let i = 0; i < realReturnSeats.length; i++) {
              if (realReturnSeats[i] != -1) {
    
                seatsAvailable2[realReturnSeats[i]] = 0;
              }
            }
            flight2update.BusinessClassSeatsAvailable = seatsAvailable2;
          } else {
            flight2update.EconomyClassSeats =
              returnFlight.EconomyClassSeats + props.p.NumberOfTickets;
            seatsAvailable2 = [...returnFlight.EconomyClassSeatsAvailable];
            for (let i = 0; i < realReturnSeats.length; i++) {
              if (realReturnSeats[i] != -1) {
                seatsAvailable2[realReturnSeats[i].ReturnSeat] = 0;
              }
            }
            flight2update.EconomyClassSeatsAvailable = seatsAvailable2;
            console.log("seats avail 2 " + seatsAvailable2);
          }
    
          axios
            .post("http://localhost:8000/flights/updateflight", flight2update)
            .then((res) => { window.location.href = "http://localhost:3000/ReservedFlights";})
            .catch(() => {
              alert("error");
            });



        })
        .catch(() => {
          alert("error");
        });



       
    
              }


            })
            .catch((err) => console.log("Error: " + err));

        });
      }
  };

  if (awayFlight === null || user === null || returnFlight === null)
    return <div> Loading...</div>;

  return (
    <div className="booking">
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


      <div className="header">
        <div className="labels">
          <label> <b>Booking Number: </b></label>
          <label>{props.p._id.toUpperCase().substring(props.p._id.length - 5 , props.p._id.length)}</label>
          {/* <label>Number of Tickets:</label>
          <label>{props.p.NumberOfTickets}</label>
          <label>Total Price of Booking:</label>
          <label>{props.p.TotalPrice}</label> */}
        </div>
        <div className = "spacer"></div>
        <div>
        <Button onClick={handleDelete}>
            <CgTrash size="25px" />
          </Button>
          <Button >
            <RemoveRedEyeIcon size="25px" />
          </Button>
          
        <Button >
            <MoreVertIcon size="25px" />
          </Button>

        </div>
      </div>
      <div className = "boarding">
        {props.p.Tickets.map((ticket) => {
          console.log(ticket.AwayCabin);
          return (
            <div>
              <BoardingPass
                props={awayFlight}
                type={ticket}
                isAway={true}
                user={user}
              ></BoardingPass>
              <BoardingPass
                props={returnFlight}
                type={ticket}
                isAway={false}
                user={user}
              ></BoardingPass>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Booking;
