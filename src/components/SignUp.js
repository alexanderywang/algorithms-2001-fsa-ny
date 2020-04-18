import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
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
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {addToast} = useToasts()

  const handleSignUp =  async e => {
    // additional user fields can be initiated here
    e.preventDefault();
    if(!userName && email && password){
      addToast("UserName can not be blank", {
        appearance: "warning",
        autoDismiss: true
      })
    }
    else{
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
              userName,
              password,
              instructor: 0,
              interviewer: 0,
              interviewee: 0,
              AMReacto: false,
              PMReacto: false
            })
            .then(() => {
              history.push("/");
            });
        })
        .catch(function(error) {
          addToast(error.message, {
            appearance: "warning",
            autoDismiss: true
          })
        });
      // try {
      //   const {user} = await firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password)

      //   await db
      //   .collection("Users")
      //   .doc(user.uid)
      //   .set({
      //       email,
      //       userName,
      //       password,
      //       instructor: 0,
      //       interviewer: 0,
      //       interviewee: 0,
      //       AMReacto: false,
      //       PMReacto: false
      //     })
      //     history.push("/");
      // } catch (error) {
        // addToast(error.message, {
        //   appearance: "warning",
        //   autoDismiss: true
        // })
      // }
    }
  }

  // const handleGoogleSignUp =  async e => {
  //   // additional user fields can be initiated here

  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(cred => {
  //         console.log("SignUp -> cred", cred);
  //         return db
  //           .collection("Users")
  //           .doc(cred.user.uid)
  //           .set({
  //             email,
  //             userName,
  //             password,
  //             instructor: 0,
  //             interviewer: 0,
  //             interviewee: 0,
  //             AMReacto: false,
  //             PMReacto: false
  //           })
  //           .then(() => {
  //             history.push("/");
  //           });
  //       })
  //       .catch(function(error) {
  //         addToast(error.message, {
  //           appearance: "warning",
  //           autoDismiss: true
  //         })
  //       });
  //     }

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
        <form onSubmit={handleSignUp}>
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
                label="UserName"
                id="userName"
                value={userName}
                onChange={e => setUserName(e.target.value)}
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
            <Button type="submit">Sign Up</Button>
            {/* <Button onClick={handleGoogleSignUp}>Sign Up with Google</Button> */}
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default withRouter(SignUp);
