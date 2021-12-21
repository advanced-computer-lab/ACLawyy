import "./Offers.css";
import tree from "./tree.jpg";
import japan from "./japan.jpg";
import italy from "./italy.jpg";

function Offers() {
  return (
    <div class="Off">
      <div class="Head">
        <p>OFFERS</p>
      </div>
      <div class="body">
        <div class="Italy">
          <div class="italy-outer">
            <div class="italy-content animated fadeInLeft">
              <span class="italy-bg animated fadeInDown">EXCLUSIVE</span>
              <div class="italy-h1">
                <h1>
                  Visit
                  <br /> Italy
                </h1>
              </div>
              <div class="italy-p">
                <p>
                  Explore the absolute highlights of Italy! Discover the ruins,
                  piazzas, and foodie districts in Rome, Venice and Florence.
                  And save up to 30% with our deals!
                </p>
              </div>

              <div class="italy-button">
                <a href="#">$115</a>
                <a class="cart-btn" href="#">
                  <i class="cart-icon ion-bag"></i>VIEW DETAILS
                </a>
              </div>
            </div>
            <div class="italy-pic">
              <img src={italy} width="300px" class="animated fadeInRight"></img>
            </div>
          </div>
        </div>

        <div class="Japan">
          <div class="japan-outer">
            <div class="japan-content animated fadeInLeft">
              <span class="japan-bg animated fadeInDown">EXCLUSIVE</span>
              <div class="japan-h1">
                <h1>
                  Visit
                  <br /> Japan
                </h1>
              </div>
              <div class="japan-p">
                <p>
                  Experience the highlights of Japan on this tour of Tokyo and
                  Kyoto and enjoy a climb up the iconic Mount Fujiyama, all at a
                  very special discount.
                </p>
              </div>

              <div class="japan-button">
                <a href="#">$115</a>
                <a class="cart-btn" href="#">
                  <i class="cart-icon ion-bag"></i>VIEW DETAILS
                </a>
              </div>
            </div>
            <div class="japan-pic">
              <img src={japan} width="300px" class="animated fadeInRight"></img>
            </div>
          </div>
        </div>

        <div class="Christmas">
          <div class="christmas-outer">
            <div class="christmas-content animated fadeInLeft">
              <span class="christmas-bg animated fadeInDown">EXCLUSIVE</span>
              <div class="christmas-h1">
                <h1>
                  Happy
                  <br />
                  Holidays!
                </h1>
              </div>
              <div class="christmas-p">
                <p>
                  Have a magical holiday with our best deals. Visit the world's
                  most festive cities and enjoy the fabulous christmas
                  celebrations.
                </p>
              </div>

              <div class="christmas-button">
                <a href="#">$115</a>
                <a class="cart-btn" href="#">
                  <i class="cart-icon ion-bag"></i>VIEW DETAILS
                </a>
              </div>
            </div>
            <div class="christmas-pic">
              <img src={tree} width="300px" class="animated fadeInRight"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Offers;
