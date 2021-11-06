import "./SideDrawer.css";

function SideDrawer() {
  return (
    <nav className="side-drawer">
      <ul>
        <li>
          <a>Show All Flights</a>
        </li>
        <li>
          <a>Create New Flight</a>
        </li>
      </ul>
    </nav>
  );
}

export default SideDrawer;
