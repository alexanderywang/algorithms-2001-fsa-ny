import React, { useState } from "react";
import { withRouter } from "react-router";
import { db, firebase } from "../config/firebase.js";
import {
  Grid,
  Button,
  Typography,
  TextField,
  DialogContent
} from "@material-ui/core";

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log("SignUp -> cred", cred);
        return db
          .collection("Users")
          .doc(cred.user.uid)
          .set({
            email,
            password
          })
          .then(() => {
            history.push("/");
          });
      })
      .catch(function(error) {
        alert(error);
      });
  };

  return (
    <Grid container direction="row" style={{ marginTop: "5em" }}>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item container direction="column">
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h2">Sign Up</Typography>
          </Grid>
        </Grid>
        <form>
          <Grid
            item
            container
            style={{ maxWidth: "20em" }}
            justify="center"
            alignItems="center"
          >
            <DialogContent
              display="flex"
              margin="auto"
              width="fit-content"
              backgroundColor="#fff"
            >
              <TextField
                required
                label="Email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </DialogContent>
            <DialogContent
              display="flex"
              margin="auto"
              width="fit-content"
              backgroundColor="#fff"
            >
              <TextField
                required
                error={password.length > 0 && password.length < 6}
                helperText={
                  password.length < 6 && password.length > 0
                    ? "Min 6 characters"
                    : ""
                }
                type="password"
                label="Password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </DialogContent>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default withRouter(SignUp);
