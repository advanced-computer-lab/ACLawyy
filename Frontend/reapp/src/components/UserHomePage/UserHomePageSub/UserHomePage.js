import "./UserHomePage.css";
import NavBar from "./NavBar/NavBar.js";
import BottomPage from "./BottomPage/BottomPage.js";
import SlideShow from "./SlideShow/SlideShow.js";
import Explore from "./Explore/Explore.js";
import Offers from "./Offers/Offers.js";
import plane from "./plane.jpg";
export default function UserHomePage() {
  return (
    <div> 
     
      <div class="Home">
        <div class="SlideShow">
          <SlideShow />
        </div>
        <div>SEARCH</div>
        <div class="plane-img">
          <div class="h1">
            <h1>
              JOIN OUR
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOYALTY CLUB
            </h1>
          </div>
          <div class="p">
            <p>
              Get exclusive offers and great discounts when you join our loyalty
              club. You get access to tons of packages the more you fly!
              <br /> This is our way of thanking you for putting your faith in
              us.
            </p>
            <div class="button">
              <a class="btn" href="#">
                JOIN NOW
              </a>
            </div>
          </div>
          <img src={plane} alt=""></img>
        </div>
        <div class="Offers">
          <Offers />
        </div>
        <div class="Explore">
          <Explore />
        </div>
      </div>
      <BottomPage class="BottomPage" />
    </div>
  );
}
