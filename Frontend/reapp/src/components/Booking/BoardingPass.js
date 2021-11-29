import "./BoardingPass.css";
import EconomyTicket from "./TicketImg/EconomyTicket.png";
import BusinessTicket from "./TicketImg/BusinessTicket.png";
import FirstClassTicket from "./TicketImg/FirstClassTicket.png";
import { FaPlane } from "react-icons/fa";

function BoardingPass(props) {

  if(props.type==0){
  return (
    <div className="ticket">
      <img src={EconomyTicket} alt="Economy Ticket"  />
      <div className="big">
        <div className="left">
          <div className="top">
            <label className = "big-label">{props.departureAirport}</label>
            <div className="plane"><FaPlane size="24pt"/></div>
            
            <label className = "big-label">{props.ArrivalAirport}</label>
            <label className = "smol-label-left">{props.DepartureCity}</label>
            <div className="spacer"></div>
            <label className = "smol-label-right">{props.ArrivalCity}</label>
          </div>
          <div className="bottom">
          <label className = "big-label-bottom">{props.DepartureDate}</label>
            <div className="spacer"></div>
            <label className = "big-label-bottom">{props.ArrivalDate}</label>
            <label className = "smol-label-left">{props.DepartureTime}</label>
            <div className="spacer"></div>
            <label className = "smol-label-right">{props.ArrivalTime}</label>
          </div>
        </div>
        <div className="right">
       <div className="right-top">
          <label className = "smol-label-left">Flight Number:</label>
          <label className = "big-label-bottom">{props.FlightNumber}</label>
       </div>
            <div className="right-middle">
            <label className = "smol-label-left">Passenger Name:</label>
            <label className = "big-label-bottom">{props.PassengerName}</label>
            </div>
            <div className="right-bottom">
            <label className = "smol-label-left">Seat:</label>
            <label className = "big-label-bottom">{props.AwaySeat}</label>
            </div>
            


        </div>
      </div>
      <div className="smol">
      <div className="right-top">
          <label className = "smol-label-left">Passenger Name:</label>
          <label className = "big-label-bottom">John Smith</label>
       </div>
            <div className="right-middle">
            <label className = "smol-label-left">Dep. Date:</label>
            <label className = "big-label-bottom">07-06-2000</label>
            </div>
            <div className="right-bottom">
            <label className = "smol-label-left">From:</label>
            <label className = "big-label-bottom">Alexandria/DAP/12:00</label>
            </div> <div className="right-top">
          <label className = "smol-label-left">To:</label>
          <label className = "big-label-bottom">Alexandria/AAP/01:00</label>
       </div>
            <div className="right-middle">
            <label className = "smol-label-left">Seat:</label>
            <label className = "big-label-bottom">20A</label>
            </div>



      </div>
    </div>
  );
  }
  else if(props.type==1){
    return (
      <div className="ticket" >
        <img src={BusinessTicket} alt="Business Ticket"  />
      </div>
    );
    }
    else{
      return (
        <div className="ticket" >
          <img src={FirstClassTicket} alt="First Class Ticket" />
        </div>
      );
      }
}

export default BoardingPass;
