import "./SideDrawerButton.css";

function SideDrawerButton(props) {
  return (
    <button className="toggle-button" onClick={props.click(props.value)}>
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
    </button>
  );
}

export default SideDrawerButton;
