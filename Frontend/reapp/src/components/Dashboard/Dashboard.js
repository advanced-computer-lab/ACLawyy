import SideDrawerButton from "../SideDrawer/SideDrawerButton";
import "./Dashboard.css";

function Dashboard(props) {
  return (
    <header className="dashboard">
      <nav className="dashboard-navigation">
        <div>
          <SideDrawerButton
            value={props.drawerValue}
            click={props.drawerClickHandler}
          />
        </div>
        <div className="dashboard-logo">
          <a href="/">THE LOGO</a>
        </div>
        <div className="spacer"></div>
        <div className="dashboard-navigation-items">
          <ul>
            <li>
              <a href="/">Profile</a>
            </li>
            <li>
              <a href="/">Settings</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Dashboard;
