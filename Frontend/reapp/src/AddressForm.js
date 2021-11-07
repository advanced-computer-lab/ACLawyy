import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Flight details
      </Typography>
      <body>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="FlightNumber"
            name="FlightNumber"
            label="Flight number"
            fullWidth
            //autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Cabin"
            name="Cabin"
            label="Cabin"
            fullWidth
            //autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="SeatsAvailable"
            name="SeatsAvailable"
            label="Seats Available"
            fullWidth
            //autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="ArrivalAirport"
            name="ArrivalAirport"
            label="Arrival Airport"
            fullWidth
            //autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="DepartureAirport"
            name="DepartureAirport"
            label="Departure Airport"
            fullWidth
            //autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
{/* 
         //DATE TIME FORMAT */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ArrivalDate"
            name="ArrivalDate"
            label="Arrival Date"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="DepartureDate"
            name="DepartureDate"
            label="Departure Date"
            fullWidth
            //autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>  */}
      </Grid>
      </body>
    </React.Fragment>
  );
}