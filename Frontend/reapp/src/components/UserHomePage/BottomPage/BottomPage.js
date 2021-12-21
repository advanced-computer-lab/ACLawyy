import "./BottomPage.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function BottomPage() {
  return (
    <div class="Parent">
      <div class="links">
        <div class="stroke">
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">More</a>
            </li>
            <li>
              <a href="#">Terms and Policies</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrapper">
        <div class="icon facebook">
          <div class="tooltip">Facebook</div>
          <span>
            {" "}
            <FaFacebookF />
            <i class="fab fa-facebook-f"></i>
          </span>
        </div>
        <div class="icon twitter">
          <div class="tooltip">Twitter</div>
          <span>
            <FaTwitter />
            <i class="fab fa-twitter"></i>
          </span>
        </div>
        <div class="icon instagram">
          <div class="tooltip">Instagram</div>
          <span>
            <FaInstagram />
            <i class="fab fa-instagram"></i>
          </span>
        </div>
        <div
          class="icon github"
          onclick="parent.open('https://github.com/advanced-computer-lab/ACLawyy')"
        >
          <div class="tooltip">Github</div>
          <span>
            <FaGithub />
            <i class="fab fa-github"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BottomPage;
