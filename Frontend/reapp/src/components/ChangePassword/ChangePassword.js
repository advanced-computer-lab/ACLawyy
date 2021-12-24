import { useEffect, useState } from "react";
import * as React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./ChangePassword.css";

export default function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    const user = {
      _id: props.UserID,
      Username: props.Username,
      Password: oldPassword,
      newPassword: newPassword,
    };

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
        <Grid container spacing={2}>
             <Grid item xs={16} sm={12} >
            <h1> Change Password</h1>

             </Grid>
                
              <Grid item xs={16} sm={12}>
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
              </Grid>
              <Grid item xs={16} sm={12}>
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
                </Grid>
              
              <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick = {handleChangePassword}
              sx={{ mt: 3, mb: 2 }}
              >
              Change Password
            </Button>
                </Grid>
               
              
    )

      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleChangePassword}
        sx={{ mt: 3, mb: 2 }}
      >
        Change Password
      </Button>
    </div>
  );
}
