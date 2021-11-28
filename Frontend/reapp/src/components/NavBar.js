import "./NavBar.css";
import { CgProfile } from "react-icons/cg";

function NavBar(props) {
  if (props.type == 0) {
    return (
      <header className="navbar">
        <nav className="navbar-nav">
          <div className="navbar-logo">
            <a href="/">LOGO</a>
          </div>
          <div className="navbar-slogan">
            <a href="/">Flying made easy ;)</a>
          </div>
          <div className="spacer"></div>
          <div className="navbar-nav-items">
            <ul>
              <li>
              <a href="/adminhome"> Home</a>
              <a href="/manageflights"> Manage Flights </a>
              </li>
            </ul>
          </div>

          <div className="navbar-profile">
            <a className="navbar-profile-logo" href="/">
              <CgProfile size="40px" />
            </a>
            <a href="/">log out</a>
          </div>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="navbar">
        <nav className="navbar-nav">
          <div className="navbar-logo">
            <a href="/">LOGO</a>
          </div>
          <div className="navbar-slogan">
            <a href="/">Flying made easy ;)</a>
          </div>
          <div className="spacer"></div>
          <div className="navbar-nav-items">
            <ul>
              <li>
                <a href="/" >Home</a>
                <a href="/">Book A Flight</a>
                <a href="/">Reserved Flights</a>
                <a href="/">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="navbar-profile">
            <a className="navbar-profile-logo" href="/">
              <CgProfile size="40px" />
            </a>
            <a href="/">log out</a>
          </div>
        </nav>
      </header>
    );
  }
}

export default NavBar;