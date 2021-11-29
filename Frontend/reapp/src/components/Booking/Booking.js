import "./Booking.css";
import BoardingPass from "./BoardingPass";

function Booking() {
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
