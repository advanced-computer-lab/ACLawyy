import "./Explore.css";
import desert from "./desert.jpg";
import beach from "./beach.jpg";
import mountain from "./mountain.jpg";

function Offers() {
  return (
    <div class="big-div">
      <div class="hh">
        <h1>Find the perfect trip</h1>
      </div>
      <div class="container">
        <div class="card">
          <div class="card__thumb">
            <img
              src="https://source.unsplash.com/75S9fpDJVdo/300x510"
              alt="Picture by Kyle Cottrell"
              class="card__image"
            ></img>
            <figcaption class="card__caption">
              <h2 class="card__title">Explore The Galaxy</h2>
              <p class="card__snippet">
                Seriously, straight up, just blast off into outer space today.
                We can help you enjoy stargazing from the best locations.{" "}
              </p>
              <a href="" class="card__button">
                Book Now{" "}
              </a>
            </figcaption>
          </div>
        </div>

        <div class="card">
          <div class="card__thumb">
            <img
              src={mountain}
              alt="Picture by Nathan Dumlao"
              class="card__image"
            ></img>
            <figcaption class="card__caption">
              <h2 class="card__title">Mountain View</h2>
              <p class="card__snippet">
                Check out all of these gorgeous mountain trips with beautiful
                views of, you guessed it, the mountains.
              </p>
              <a href="" class="card__button">
                View Trips
              </a>
            </figcaption>
          </div>
        </div>

        <div class="card">
          <div class="card__thumb">
            <img
              src={beach}
              alt="Picture by Daniel Lincoln"
              class="card__image"
            ></img>
            <figcaption class="card__caption">
              <h2 class="card__title">To The Beach</h2>
              <p class="card__snippet">
                Plan your next beach trip with these fabulous destinations.
                Don't worry, we will help you find the perfect destination, all
                year long!
              </p>
              <a href="" class="card__button">
                View Trips
              </a>
            </figcaption>
          </div>
        </div>
        <div class="card">
          <div class="card__thumb">
            <img
              src={desert}
              alt="Picture by Daniel Lincoln"
              class="card__image"
            ></img>
            <figcaption class="card__caption">
              <h2 class="card__title">Desert Destinations</h2>
              <p class="card__snippet">
                It's the desert you've always dreamed of. Avoid the crowds and
                enjoy a peaceful experience.
              </p>
              <a href="" class="card__button">
                Book Now
              </a>
            </figcaption>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Offers;
