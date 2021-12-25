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
import {ReactSession} from 'react-client-session';
const passwordGenerator = () => {
  const firsthalf = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);

  const secondhalf = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
  
  
  const newPass = firsthalf + secondhalf
  var finalPass = newPass;
  const count = Math.floor(Math.random() * newPass.length);
  for (var i = 0 ; i <count ; i++){
      const randIndex = Math.floor(Math.random() * newPass.length);
      const randNumb = Math.floor(Math.random() * 10);
      finalPass = finalPass.substring(0, randIndex) + randNumb+ finalPass.substring(randIndex+1, finalPass.length )
      
  }
  return finalPass
}

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

export default function SignIn(props) {
  const [username,setUsername]= useState(" ");
  const [password,setPassword]= useState(" ");
  const [showError, setShowError] = useState(false);

  const [showMailSent, setShowMailSent] = useState(false);

  useEffect(()=> {
    ReactSession.set("userType", 2);
  },[])
  const allFieldsValid = () => {
    if (username == " "||password == " ")
      return false;
    return true;
  }
  const handleForgotPassword = () => {
    const newPassword = passwordGenerator();
 
    var user = null;
    axios
      .post("http://localhost:8000/Users/getUserDetailsNoID", {
        Username: username 
      })
      .then((res) => {
        setShowMailSent(true);
        user = res.data;
        user.newPassword = newPassword;
        const mailBody = {
          email : user.Email,
          subject : "Your new Password",
          text : "Your new password is [  " + newPassword + "  ] .\n Make sure to change it as soon as possible (It is very secure though) "

      
        };
        axios
        .post(
          "http://localhost:8000/users/forgotpassword2",
          user
        )
        .then((res) => {
          




        axios
        .post(
          "http://localhost:8000/tickets/email",mailBody
        
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

  const handleSignIn = () => {
    const user = 
      {
        Username : username.toLowerCase(),
        Password: password
      }
    axios
    .post(
      "http://localhost:8000/users/login",
      user
    )
    .then((res) => {
      if (res.data.message != "Success")
        setShowError(true);
      else{
        setShowError(false);
        props.setUserID(res.data.userID);
        props.setUserType(res.data.UserType);

      ReactSession.set("userType", res.data.UserType);
       ReactSession.set("id", res.data.userID);

      
       if (res.data.UserType == 0)
        window.location.href = "http://localhost:3000/adminhome";
       else 
        window.location.href = "http://localhost:3000/";
      }

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              onChange= {(e)=>
                setUsername(e.target.value)
              }
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange= {(e)=>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
            />
            {showError&&<Alert severity="error">Incorrect Username or Password!</Alert>}
            {showMailSent&&<Alert severity="info">Check your email to find your new password</Alert>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled = {!allFieldsValid()}
              onClick = {handleSignIn}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick = {handleForgotPassword} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="http://localhost:3000/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}