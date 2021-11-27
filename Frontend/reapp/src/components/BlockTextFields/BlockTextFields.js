import "./BlockTextFields.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import BasicTimePicker from "../BasicTimePicker/BasicTimePicker";
import { CgSearch } from "react-icons/cg";
import { CgAdd } from "react-icons/cg";
import { FiX } from "react-icons/fi";
function BlockTextFields(props) {
  if (props.type == 0) {
    return <div></div>;
  } else if (props.type == 1) {
    //search
    return (
      <div className="block">
        <label className="flightInfo">Flight Information</label>
        <div className="container">
          <div className="field">
            <TextField
              id="flightNumber"
              label="Flight Number"
              variant="outlined"
            />
          </div>
          <div className="field">
            <TextField
              id="baggageAllowance"
              label="Baggage Allowance"
              variant="outlined"
              type="Number"
            />
          </div>
          <div className="field">
            <TextField
              id="economyPrice"
              label="Basic Price"
              variant="outlined"
            />
          </div>
        </div>
        <div className="container">
          <div className="field">
            <TextField
              id="firstClassSeats"
              label="First Class Seats"
              variant="outlined"
              type="Number"
            />
          </div>
          <div className="field">
            <TextField
              id="businessClassSeats"
              label="Business Class Seats"
              variant="outlined"
              type="Number"
            />
          </div>
          <div className="field">
            <TextField
              id="economyClassSeats"
              label="Economy Class Seats"
              variant="outlined"
              type="Number"
            />
          </div>
        </div>

        <div className="align">
          <div>
            <label className="depInfo">Departure Information</label>
            <div className="container">
              <div className="field">
                <BasicDatePicker label="Departure Date" />
              </div>
              <div className="field">
                <TextField
                  id="depatureAirport"
                  label="Departure Airport"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="container">
              <div className="field">
                <BasicTimePicker label="Departure Time" />
              </div>
              <div className="field">
                <TextField
                  id="depatureCity"
                  label="Departure City"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="depInfo">Arrival Information</label>

            <div className="container">
              <div className="field">
                <BasicDatePicker label="Arrival Date" />
              </div>
              <div className="field">
                <TextField
                  id="arrivalAirport"
                  label="Arrival Airport"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="container">
              <div className="field">
                <BasicTimePicker label="Arrival Time" />
              </div>
              <div className="field">
                <TextField
                  id="arrivalCity"
                  label="Arrival City"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block-button">
          <Button
            variant="contained"
            color="error"
            endIcon={<FiX />}
            onClick={props.blockRemover}
          >
            Cancel
          </Button>
          <div className="spacer"></div>
          <Button variant="contained" endIcon={<CgSearch />}>
            Search
          </Button>
        </div>
      </div>
    );
  } else {
    //create
    return (
      <div className="block">
        <label className="flightInfo">Flight Information</label>
        <div className="container">
          <div className="field">
            <TextField
              id="flightNumber"
              label="Flight Number"
              variant="outlined"
            />
          </div>
          <div className="field">
            <TextField
              id="baggageAllowance"
              label="Baggage Allowance"
              variant="outlined"
              type="Number"
            />
          </div>
          <div className="field">
            <TextField
              id="economyPrice"
              label="Basic Price"
              variant="outlined"
            />
          </div>
        </div>
        <div className="container">
          <div className="field">
            <TextField
              id="firstClassSeats"
              label="First Class Seats"
              variant="outlined"
              type="Number"
            />
          </div>
          <div className="field">
            <TextField
              id="businessClassSeats"
              label="Business Class Seats"
              variant="outlined"
              type="Number"
            />
          </div>
          <div className="field">
            <TextField
              id="economyClassSeats"
              label="Economy Class Seats"
              variant="outlined"
              type="Number"
            />
          </div>
        </div>

        <div className="align">
          <div>
            <label className="depInfo">Departure Information</label>
            <div className="container">
              <div className="field">
                <BasicDatePicker label="Departure Date" />
              </div>
              <div className="field">
                <TextField
                  id="depatureAirport"
                  label="Departure Airport"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="container">
              <div className="field">
                <BasicTimePicker label="Departure Time" />
              </div>
              <div className="field">
                <TextField
                  id="depatureCity"
                  label="Departure City"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="depInfo">Arrival Information</label>

            <div className="container">
              <div className="field">
                <BasicDatePicker label="Arrival Date" />
              </div>
              <div className="field">
                <TextField
                  id="arrivalAirport"
                  label="Arrival Airport"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="container">
              <div className="field">
                <BasicTimePicker label="Arrival Time" />
              </div>
              <div className="field">
                <TextField
                  id="arrivalCity"
                  label="Arrival City"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block-button">
          <Button
            variant="contained"
            color="error"
            endIcon={<FiX />}
            onClick={props.blockRemover}
          >
            Cancel
          </Button>
          <div className="spacer"></div>
          <Button variant="contained" endIcon={<CgAdd />}>
            Create
          </Button>
        </div>
      </div>
    );
  }
}
export default BlockTextFields;
