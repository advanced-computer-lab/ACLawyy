import { useEffect, useState } from "react";
import * as React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./ChangePassword.css";
import Alert from '@mui/material/Alert';

export default function ChangePassword(props) {
    const [oldPassword, setOldPassword]= useState("");
    const [newPassword, setNewPassword]= useState("");
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess]= useState(false);
    const [close,setClose]=useState(false);
    const [change, setChange]= useState(true);
    const handleClose = ()=>{
      this.handleRequestClose();
    }
    const handleChangePassword = () => {
      
        
        const user = 
        {
        _id: props.UserID,
          Username : props.Username,
          Password: oldPassword,
          newPassword: newPassword
        }

        axios
        .post(
          "http://localhost:8000/users/changepassword",
          user
        )
        .then((res) => {
          if (res.data.message != "Success"){

            setShowError(true);
            setShowSuccess(false);
          
          }
          else{
            setShowError(false);
            setShowSuccess(true);
            setChange(false);
            setClose(true);

          }
        
         
          
    
        })
        .catch(() => {
          alert("error");
        });

    axios
      .post("http://localhost:8000/users/changepassword", user)
      .then((res) => {
        alert(res.data.message);
      })
      .catch(() => {
        alert("error");
      });
  };

    return(
      <div classname = "changePassKollaha">
        
          <div classname = "bigPop">
          
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Change Password</h1>

        
          </div>
             
                
              
                <TextField
                  autoComplete="given-name"
                  name="oldPassword"
                  required
                  fullWidth
                  id="Password"
                  type="Password"
                  label="Old Password"
                  onChange= {(e)=>
                    setOldPassword(e.target.value)
                }
                autoFocus
                />
              
              
                <TextField
                  required
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  autoComplete="newPassword"
                  onChange= {(e)=>
                    setNewPassword(e.target.value)
                }
                type="Password"
                
                />
                
                <Grid item xs={16} sm={12}>
                {showError &&<Alert severity="error">Incorrect Old Password!</Alert>}
                {showSuccess && <Alert severity="success">You successfully Changed your Password!</Alert>}
                </Grid>
                {close && <Button
                
              type="submit"
              fullWidth
              variant="contained"
              disabled = {true}
              sx={{ mt: 3, mb: 2 }}
              >
             Click Outside Window to Close
            </Button> }  
              {change && <Button
              classname = "changebutton"
              type="submit"
              fullWidth
              variant="contained"
              onClick = {handleChangePassword}
              sx={{ mt: 3, mb: 2 }}
              >
              Change Password
            </Button>}
                
               
              
    

      
    </div>
  );
}
