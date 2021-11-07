import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {}
    </Typography>
  );
}

const steps = ['Create flight'];

function getStepContent(sep) {
      return <AddressForm />;
  }

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

// const addF={
//   FlightName: this.FlightName,
//   Cabin: this.Cabin,
//   SeatsAvailable: this.SeatsAvailable,
//   ArrivalDate: this.ArrivalDate,
//   DeaprtureDate: this.DepartureDate,
//   ArrivalAirport: this.ArrivalAirport,
//   DepartureAirport: this.DepartureAirport
// }

  const handleNext = () => {

    axios.get('https:localhost:5000/honey').then(res => {

console.log("blaa")

    }).catch(err => {console.log(err);})
//     axios.post('https:localhost:5000/flights/CreateFlight')
// .then(res => console.log(res.data));
  };




  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create flight
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={() => axios.get('https:localhost:5000/honey').then(res => {

                      console.log("blaa")
                      
                          }).catch(err => {console.log(err);})}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Create
                  </Button>
                </Box>
              </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

 
