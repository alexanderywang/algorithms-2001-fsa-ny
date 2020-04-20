import React, { useCallback, useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { withRouter, Redirect } from "react-router";
import { firebase,google,db } from "../config/firebase.js";
import { AuthContext } from "./Auth.js";
import {
  Grid,
  Button,
  Typography,
  TextField,
  DialogContent
} from "@material-ui/core";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {addToast} = useToasts()

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        addToast(error.message, {
          appearance: "warning",
          autoDismiss: true
        })
      }
    },
    [history]
  );

  const handleGoogleLogin =  async e => {
    try {
      const userCredential = await firebase.auth().signInWithPopup(google)

      let newUser = userCredential.additionalUserInfo.isNewUser

      if(newUser){
        const userName = await firebase.auth().currentUser.displayName;

        const email = await firebase.auth().currentUser.email;

          db.collection("Users")
          .doc(userCredential.user.uid)
          .set({
            email,
            userName,
            instructor: 0,
            interviewer: 0,
            interviewee: 0,
            AMReacto: false,
            PMReacto: false
          })
      }

         history.push("/")
        }
         catch (error) {
          addToast(error.message, {
            appearance: "warning",
            autoDismiss: true
          })
    }
  }

  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

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
            <Typography variant="h2">Log In</Typography>
          </Grid>
        </Grid>
        <form onSubmit={handleLogin}>
          <DialogContent
            display="flex"
            margin="auto"
            width="fit-content"
            backgroundColor="#fff"
          >
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
          </DialogContent>
          <DialogContent
            display="flex"
            margin="auto"
            width="fit-content"
            backgroundColor="#fff"
          >
            <TextField
              type="password"
              label="Password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
          </DialogContent>
          <Button
            type="submit"
            style={{
              fontFamily: "Roboto",
              fontSize: 14,
              marginRight: "20px",
              color: "#3F51B5"
            }}
            marginRight="20px"
            fontWeight="400"
            textTransform="none"
            borderRadius="5"
            height="46"
            padding="10"
            alignItems="center"
          >
            LOG IN
          </Button>
          <Button onClick={handleGoogleLogin}>Log in with Google</Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default withRouter(Login);
