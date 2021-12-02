import "./BoardingPass.css";
import EconomyTicket from "./TicketImg/EconomyTicket.png";
import BusinessTicket from "./TicketImg/BusinessTicket.png";
import FirstClassTicket from "./TicketImg/FirstClassTicket.png";
import { FaPlane } from "react-icons/fa";

function BoardingPass({ props, type, isAway, user }) {
  console.log(props);

  var cabin = {};
  var mySeat = type.Seat;
  if (type.Seat === undefined) {
    mySeat = <a href="/">Assign Seat</a>;
  }

  if (isAway) {
    cabin = type.AwayCabin;
  } else {
    cabin = type.ReturnCabin;
  }
  if (cabin === "Economy") {
    return (
      <div className="ticket">
        <img src={EconomyTicket} alt="Economy Ticket" />
        <div className="big">
          <div className="left">
            <div className="top">
              <label className="big-label">{props.DepartureAirport}</label>
              <div className="plane">
                <FaPlane size="24pt" />
              </div>

              <label className="big-label">{props.ArrivalAirport}</label>
              <label className="smol-label-left">{props.DepartureCity}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalCity}</label>
            </div>
            <div className="bottom">
              <label className="big-label-bottom">{props.DepartureDate}</label>
              <div className="spacer"></div>
              <label className="big-label-bottom">{props.ArrivalDate}</label>
              <label className="smol-label-left">{props.DepartureTime}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalTime}</label>
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <label className="smol-label-left">Flight Number:</label>
              <label className="big-label-bottom">{props.FlightNumber}</label>
            </div>
            <div className="right-middle">
              <label className="smol-label-left">Passenger Name:</label>
              <label className="big-label-bottom">
                {user.FirstName} {user.LastName}
              </label>
            </div>
            <div className="right-bottom">
              <label className="smol-label-left">Seat:</label>
              <label className="big-label-bottom">{mySeat}</label>
            </div>
          </div>
        </div>
        <div className="smol">
          <div className="right-top">
            <label className="smol-label-left">Passenger Name:</label>
            <label className="big-label-bottom">
              {user.FirstName} {user.LastName}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Dep. Date:</label>
            <label className="big-label-bottom">{props.DepartureDate}</label>
          </div>
          <div className="right-bottom">
            <label className="smol-label-left">From:</label>
            <label className="big-label-bottom">
              {props.DepartureCity}/{props.DepartureAirport}/
              {props.DepartureTime}
            </label>
          </div>
          <div className="right-top">
            <label className="smol-label-left">To:</label>
            <label className="big-label-bottom">
              {props.ArrivalCity}/{props.ArrivalAirport}/{props.ArrivalTime}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Seat:</label>
            <label className="big-label-bottom">{mySeat}</label>
          </div>
        </div>
      </div>
    );
  } else if (cabin === "Business") {
    return (
      <div className="ticket">
        <img src={BusinessTicket} alt="Business Ticket" />
        <div className="big">
          <div className="left">
            <div className="top">
              <label className="big-label">{props.DepartureAirport}</label>
              <div className="plane">
                <FaPlane size="24pt" />
              </div>

              <label className="big-label">{props.ArrivalAirport}</label>
              <label className="smol-label-left">{props.DepartureCity}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalCity}</label>
            </div>
            <div className="bottom">
              <label className="big-label-bottom">{props.DepartureDate}</label>
              <div className="spacer"></div>
              <label className="big-label-bottom">{props.ArrivalDate}</label>
              <label className="smol-label-left">{props.DepartureTime}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalTime}</label>
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <label className="smol-label-left">Flight Number:</label>
              <label className="big-label-bottom">{props.FlightNumber}</label>
            </div>
            <div className="right-middle">
              <label className="smol-label-left">Passenger Name:</label>
              <label className="big-label-bottom">
                {user.FirstName} {user.LastName}
              </label>
            </div>
            <div className="right-bottom">
              <label className="smol-label-left">Seat:</label>
              <label className="big-label-bottom">{mySeat}</label>
            </div>
          </div>
        </div>
        <div className="smol">
          <div className="right-top">
            <label className="smol-label-left">Passenger Name:</label>
            <label className="big-label-bottom">
              {user.FirstName} {user.LastName}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Dep. Date:</label>
            <label className="big-label-bottom">{props.DepartureDate}</label>
          </div>
          <div className="right-bottom">
            <label className="smol-label-left">From:</label>
            <label className="big-label-bottom">
              {props.DepartureCity}/{props.DepartureAirport}/
              {props.DepartureTime}
            </label>
          </div>
          <div className="right-top">
            <label className="smol-label-left">To:</label>
            <label className="big-label-bottom">
              {props.ArrivalCity}/{props.ArrivalAirport}/{props.ArrivalTime}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Seat:</label>
            <label className="big-label-bottom">{mySeat}</label>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ticket">
        <img src={FirstClassTicket} alt="First Class Ticket" />
        <div className="big">
          <div className="left">
            <div className="top">
              <label className="big-label">{props.DepartureAirport}</label>
              <div className="plane">
                <FaPlane size="24pt" />
              </div>

              <label className="big-label">{props.ArrivalAirport}</label>
              <label className="smol-label-left">{props.DepartureCity}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalCity}</label>
            </div>
            <div className="bottom">
              <label className="big-label-bottom">{props.DepartureDate}</label>
              <div className="spacer"></div>
              <label className="big-label-bottom">{props.ArrivalDate}</label>
              <label className="smol-label-left">{props.DepartureTime}</label>
              <div className="spacer"></div>
              <label className="smol-label-right">{props.ArrivalTime}</label>
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <label className="smol-label-left">Flight Number:</label>
              <label className="big-label-bottom">{props.FlightNumber}</label>
            </div>
            <div className="right-middle">
              <label className="smol-label-left">Passenger Name:</label>
              <label className="big-label-bottom">
                {user.FirstName} {user.LastName}
              </label>
            </div>
            <div className="right-bottom">
              <label className="smol-label-left">Seat:</label>
              <label className="big-label-bottom">{mySeat}</label>
            </div>
          </div>
        </div>
        <div className="smol">
          <div className="right-top">
            <label className="smol-label-left">Passenger Name:</label>
            <label className="big-label-bottom">
              {user.FirstName} {user.LastName}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Dep. Date:</label>
            <label className="big-label-bottom">{props.DepartureDate}</label>
          </div>
          <div className="right-bottom">
            <label className="smol-label-left">From:</label>
            <label className="big-label-bottom">
              {props.DepartureCity}/{props.DepartureAirport}/
              {props.DepartureTime}
            </label>
          </div>
          <div className="right-top">
            <label className="smol-label-left">To:</label>
            <label className="big-label-bottom">
              {props.ArrivalCity}/{props.ArrivalAirport}/{props.ArrivalTime}
            </label>
          </div>
          <div className="right-middle">
            <label className="smol-label-left">Seat:</label>
            <label className="big-label-bottom">{mySeat}</label>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardingPass;
