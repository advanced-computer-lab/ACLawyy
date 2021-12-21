import "./SlideShow.css";
import travel from "./travel.jpg";
import travel2 from "./travel2.jpg";
import travel3 from "./travel3.jpg";
import travel4 from "./travel4.jpg";
import travel5 from "./travel5.jpg";

function SlideShow() {
  return (
    <div class="panel">
      <div class="pic-ctn">
        <img src={travel} alt="" class="pic"></img>
        <img src={travel2} alt="" class="pic"></img>
        <img src={travel3} alt="" class="pic"></img>
        <img src={travel4} alt="" class="pic"></img>
        <img src={travel5} alt="" class="pic"></img>
      </div>
    </div>
  );
}
export default SlideShow;

//1225*320
