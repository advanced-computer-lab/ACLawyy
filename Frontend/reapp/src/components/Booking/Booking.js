import "./Booking.css";
import BoardingPass from "./BoardingPass";

function Booking(props) {
 const flightHandler=()=>{
  axios
  .post("http://localhost:8000/Tickets/findMyTickets", props.UserID)
  .then((res) => {
   
    res.map((ticket)=> {


      return (
        <BoardingPass
        departureAirport = {}
        />
          

      );
    })
  })
  .catch((e) => {
    alert("error");
    console.log(e);
  });
}
  return (
    <div className="booking">
        <div className="booking-top">
        <BoardingPass type="0"/>
        </div>
        <div className="booking-bottom">
        <BoardingPass type="2"/>
        </div>
    </div>
  );
}

export default Booking;
