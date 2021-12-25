import "./BottomPage.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function BottomPage() {
  return (
    <div className="Parent">
      <div className="links">
        <div className="stroke">
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
      <div className="wrapper">
        <div className="icon facebook">
          <div className="tooltip">Facebook</div>
          <span>
            {" "}
            <FaFacebookF />
            <i className="fab fa-facebook-f"></i>
          </span>
        </div>
        <div className="icon twitter">
          <div className="tooltip">Twitter</div>
          <span>
            <FaTwitter />
            <i className="fab fa-twitter"></i>
          </span>
        </div>
        <div className="icon instagram">
          <div className="tooltip">Instagram</div>
          <span>
            <FaInstagram />
            <i className="fab fa-instagram"></i>
          </span>
        </div>
        <div
          className="icon github"
          onclick="parent.open('https://github.com/advanced-computer-lab/ACLawyy')"
        >
          <div className="tooltip">Github</div>
          <span>
            <FaGithub />
            <i className="fab fa-github"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BottomPage;
