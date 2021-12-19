import { useEffect, useState } from "react";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [firstName,setFirstName]= useState(" ");
  const [lastName,setLastName]= useState(" ");
  const [passportNumber,setPassportNumber]= useState(" ");
  const [email,setEmail]= useState(" ");
  const [telephoneNumber,setTelephoneNumber]= useState(" ");
  const [username,setUsername]= useState(" ");
  const [password,setPassword]= useState(" ");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);




  const allFieldsValid = () => {
    if (firstName == " "||lastName == " "||passportNumber == " "||email == " "||telephoneNumber == " "||username == " "||password == " ")
      return false;
    return true;
  }
  const handleSignUp = () => {

    const user = 
    {
      FirstName : firstName,
      LastName : lastName,
      TelephoneNumber: telephoneNumber,
      PassportNumber : passportNumber,
      UserType : 1,
      Username : username,
      Email: email,
      Password: password
    }



    axios
    .post(
      "http://localhost:8000/users/searchemail",
      user
    )
    .then((res) => {
      if (res.data.length != 0)
        setShowEmailError(true);
      else
        setShowEmailError(false);

        axios
        .post(
          "http://localhost:8000/users/searchusername",
          user
        )
        .then((res2) => {
          if (res2.data.length != 0)
            setShowUserError(true);
          else
            setShowUserError(false);


          axios
          .post(
            "http://localhost:8000/users/register",
            user
          )
          .then((res) => {
      
          })
          .catch(() => {
            alert("error");
          });

        })
        .catch(() => {
          alert("error");
        });
    



    })
    .catch(() => {
      alert("error");
    });








 
    

 



  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  onChange= {(e)=>
                    setFirstName(e.target.value)
                  }
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange= {(e)=>
                    setLastName(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="PassportNumber"
                  label="Passport Number"
                  type="PassportNumber"
                  id="PassportNumber"
                  autoComplete="new-PassportNumber"
                  onChange= {(e)=>
                    setPassportNumber(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange= {(e)=>
                    setEmail(e.target.value)
                  }
                />
              </Grid>
              {showEmailError&&<Grid item xs={12}>
              <Alert severity="error">This Email is already taken,&nbsp;  
              <Link href="http://localhost:3000/signin">
                  Sign in instead?
                </Link></Alert>
              </Grid>}
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="TelephoneNumber"
                  label="Telephone Number"
                  name="TelephoneNumber"
                  autoComplete="TelephoneNumber"
                  onChange= {(e)=>
                    setTelephoneNumber(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Username"
                  label="Username"
                  type="Username"
                  id="Username"
                  autoComplete="new-Username"
                  onChange= {(e)=>
                    setUsername(e.target.value)
                  }
                />
              </Grid>
              {showUserError&&<Grid item xs={12}>
              <Alert severity="error">This Username is already taken,&nbsp;  
              <Link href="http://localhost:3000/signin">
                  Sign in instead?
                </Link></Alert>
              </Grid>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="Password"
                  id="Password"
                  autoComplete="new-Password"
                  onChange= {(e)=>
                    setPassword(e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled = {!allFieldsValid()}
              onClick = {handleSignUp}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:3000/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}