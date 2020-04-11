import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { firebase } from "../config/firebase.js";
import {
  Grid,
  Button,
  Typography,
  TextField,
  DialogContent
} from "@material-ui/core";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <Grid>
      <Typography variant="h1">Sign up</Typography>
      <form onSubmit={handleSignUp}>
        <DialogContent
          display="flex"
          margin="auto"
          width="fit-content"
          backgroundColor="#fff"
        >
          <TextField>
            Email
            <input name="email" type="email" placeholder="Email" />
          </TextField>
        </DialogContent>
        <DialogContent
          display="flex"
          margin="auto"
          width="fit-content"
          backgroundColor="#fff"
        >
          <TextField>
            Password
            <input name="password" type="password" placeholder="Password" />
          </TextField>
        </DialogContent>
        <Button type="submit">Sign Up</Button>
      </form>
    </Grid>
  );
};

export default withRouter(SignUp);
