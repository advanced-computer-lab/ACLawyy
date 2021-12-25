import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {ReactSession} from 'react-client-session';

function AdminTable(props) {
  useEffect(()=> {
    ReactSession.set("userType", 0);
  },[])
  const [selected, setSelected] = useState([]);
  const [editable, setEditable] = useState(-1);
  const [depAir, setDepAir] = useState();
  const [depCity, setDepCity] = useState();
  const [depDate, setDepDate] = useState();
  const [depTime, setDepTime] = useState();
  const [arrAir, setArrAir] = useState();
  const [arrCity, setArrCity] = useState();
  const [arrDate, setArrDate] = useState();
  const [arrTime, setArrTime] = useState();
  const [bag, setBag] = useState();
  const [firstSeats, setFirstSeats] = useState();
  const [busSeats, setBusSeats] = useState();
  const [econSeats, setEconSeats] = useState();
  const [price, setPrice] = useState();
  const onChanges = [
    setDepAir,
    setDepCity,
    setDepDate,
    setDepTime,
    setArrAir,
    setArrCity,
    setArrDate,
    setArrTime,
    setBag,
    setFirstSeats,
    setBusSeats,
    setEconSeats,
    setPrice,
  ];

  const clearUpdates = () => {
    onChanges.forEach((func) => func(""));
  };

  const handleUpdate = () => {
    if (editable === -1 && selected.length === 1) setEditable(selected[0]);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  };
  const handleDelete = () => {
    const val = window.confirm(
      "Are you sure you want to delete the selected " +
        selected.length +
        " flight(s)?"
    );
    if (val) {
      selected.forEach((item, index) => {
        axios
          .post("http://localhost:8000/flights/deleteflight", { _id: item })
          .then((res) => {

            props.refresh();

          })
          .catch(() => {
            alert("error");
          });
      });
      setSelected([]);

      alert("Item(s) deleted successfuly");
    }
  };

  useEffect(() => {
    props.refresh();
    clearUpdates();
  }, []);

  const handleConfirmUpdate = () => {
    let bod = { _id: editable };
    if (depAir.length > 0) bod.DepartureAirport = depAir;
    if (depCity.length > 0) bod.DepartureCity = depCity;
    if (depDate.length > 0) bod.DepartureDate = depDate;
    if (depTime.length > 0) bod.DepartureTime = depTime;

    if (arrAir.length > 0) bod.ArrivalAirport = arrAir;
    if (arrCity.length > 0) bod.ArrivalCity = arrCity;
    if (arrDate.length > 0) bod.ArrivalDate = arrDate;
    if (arrTime.length > 0) bod.ArrivalTime = arrTime;

    if (firstSeats.length > 0) bod.FirstClassSeats = firstSeats;
    if (busSeats.length > 0) bod.BusinessClassSeats = busSeats;
    if (econSeats.length > 0) bod.EconomyClassSeats = econSeats;

    if (bag.length > 0) bod.BaggageAllowance = bag;
    if (price.length > 0) bod.EconomyPrice = price;

    axios
      .post("http://localhost:8000/flights/updateflight", bod)
      .then((res) => {})
      .catch(() => {
        alert("error");
      });
    setEditable(-1);
    //alert( depAir + " " + depCity + " " + depDate + " " + depTime + " " + arrAir + " " + arrCity + " " + arrDate + " " + arrTime + " " + bag + " " + firstSeats + " " + busSeats + " " + econSeats + " " + price);

    clearUpdates();
    props.refresh();

  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    if (newSelected.length !== 1) setEditable(-1);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const isSelectedForUpdate = (id) => {
    return selected.length === 1 && id === editable;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        editable={editable}
        onConfirm={handleConfirmUpdate}
      />
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 600, minWidth: 600 }} aria-label="simple table">
          <TableHead sx={{ maxWidth: 600, minWidth: 600 }}>
            <TableRow>
              <TableCell align="left">
                <b>Expand</b>
              </TableCell>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < props.rows.length
                  }
                  checked={
                    props.rows.length > 0 &&
                    selected.length === props.rows.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {props.columns.map((column) => (
                <TableCell align="left">
                  <b>{column}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxWidth: 600, minWidth: 600 }}>
            {props.rows.map((row) => {
              return (
                <Row
                  key={row._id}
                  row={row}
                  isSelected={isSelected}
                  handleChange={handleClick}
                  isSelectedForUpdate={isSelectedForUpdate}
                  onChanges={onChanges}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function Row(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, maxWidth: 600 }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            onChange={(event) => props.handleChange(event, props.row._id)}
            checked={props.isSelected(props.row._id)}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {props.row.FlightNumber}
        </TableCell>
        {props.isSelectedForUpdate(props.row._id) ? (
          <>
            <TableCell align="left">
              <input
                type="text"
                placeholder={props.row.DepartureAirport}
                size="7"
                onChange={(e) => {
                  props.onChanges[0](e.target.value);
                }}
              />
            </TableCell>
            <TableCell align="left">
              <input
                type="date"
                placeholder={props.row.DepartureDate}
                size="7"
                onChange={(e) => {
                  props.onChanges[2](e.target.value);
                }}
              />
            </TableCell>
            <TableCell align="left">
              <input
                type="text"
                placeholder={props.row.ArrivalAirport}
                size="7"
                onChange={(e) => {
                  props.onChanges[4](e.target.value);
                }}
              />
            </TableCell>
            <TableCell align="left">
              <input
                type="date"
                placeholder={props.row.ArrivalDate}
                size="7"
                onChange={(e) => {
                  props.onChanges[6](e.target.value);
                }}
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell align="left">{props.row.DepartureAirport}</TableCell>
            <TableCell align="left">{props.row.DepartureDate}</TableCell>
            <TableCell align="left">{props.row.ArrivalAirport}</TableCell>
            <TableCell align="left">{props.row.ArrivalDate}</TableCell>
          </>
        )}
        <TableCell align="left">
          {props.row.BusinessClassSeats +
            props.row.FirstClassSeats +
            props.row.EconomyClassSeats}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <b>Details</b>
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                sx={{ maxWidth: 600, minWidth: 600 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Baggage Allowance(Kg)</b>
                    </TableCell>

                    <TableCell>
                      <b>Departure City</b>
                    </TableCell>
                    <TableCell>
                      <b>Departure Time</b>
                    </TableCell>
                    <TableCell>
                      <b>Arrival City</b>
                    </TableCell>
                    <TableCell>
                      <b>Arrival Time</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {props.isSelectedForUpdate(props.row._id) ? (
                  <TableBody sx={{ maxWidth: 600, minWidth: 600 }}>
                    <TableRow>
                      <TableCell>
                        <input
                          type="number"
                          placeholder={props.row.BaggageAllowance}
                          size="3"
                          onChange={(e) => {
                            props.onChanges[8](e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          placeholder={props.row.DepartureCity}
                          size="7"
                          onChange={(e) => {
                            props.onChanges[1](e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="time"
                          placeholder={props.row.DepartureTime}
                          size="7"
                          onChange={(e) => {
                            props.onChanges[3](e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          placeholder={props.row.ArrivalCity}
                          size="7"
                          onChange={(e) => {
                            props.onChanges[5](e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="time"
                          placeholder={props.row.ArrivalTime}
                          size="7"
                          onChange={(e) => {
                            props.onChanges[7](e.target.value);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell>{props.row.BaggageAllowance}</TableCell>
                      <TableCell>{props.row.DepartureCity}</TableCell>
                      <TableCell>{props.row.DepartureTime}</TableCell>
                      <TableCell>{props.row.ArrivalCity}</TableCell>
                      <TableCell>{props.row.ArrivalTime}</TableCell>
                    </TableRow>
                  </TableBody>
                )}
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>First Class Seats</b>
                    </TableCell>

                    <TableCell>
                      <b>Business Class Seats</b>
                    </TableCell>
                    <TableCell>
                      <b>Economy Class Seats</b>
                    </TableCell>
                    <TableCell>
                      <b>Base Price ($)</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {props.isSelectedForUpdate(props.row._id) ? (
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <input
                          type="number"
                          placeholder={props.row.FirstClassSeats}
                          size="3"
                          onChange={(e) => {
                            props.onChanges[9](e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="number"
                          placeholder={props.row.BusinessClassSeats}
                          size="3"
                          onChange={(event) =>
                            props.onChanges[10](event.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="number"
                          placeholder={props.row.EconomyClassSeats}
                          size="3"
                          onChange={(event) =>
                            props.onChanges[11](event.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="number"
                          placeholder={props.row.EconomyPrice}
                          size="3"
                          onChange={(e) => {
                            props.onChanges[12](e.target.value);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell>{props.row.FirstClassSeats}</TableCell>
                      <TableCell>{props.row.BusinessClassSeats}</TableCell>
                      <TableCell>{props.row.EconomyClassSeats}</TableCell>
                      <TableCell> {props.row.EconomyPrice}</TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const EnhancedTableToolbar = (props) => {
  const numSelected = props.numSelected;

  return (
    <Toolbar
      sx={{
        maxWidth: 635,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <b>Flights</b>
        </Typography>
      )}
      {numSelected === 1 && props.editable === -1 ? (
        <Tooltip title="Edit">
          <IconButton onClick={() => props.onUpdate()}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div />
      )}
      {numSelected === 1 && props.editable !== -1 ? (
        <Tooltip title="Confirm">
          <IconButton onClick={() => props.onConfirm()}>
            <CheckIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div />
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => props.onDelete()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div />
      )}
    </Toolbar>
  );
};

export default AdminTable;
