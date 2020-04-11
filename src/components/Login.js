import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { firebase } from "../config/firebase.js";
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
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);
  console.log("Login -> currentUser", currentUser);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Grid>
      <Typography variant="h3">Log in</Typography>
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
            // error={!isEmpty(validate(email)) && email.length > 0}
            // helperText={
            //   validate(email) && email.length > 0
            //     ? "Please enter a valid email"
            //     : ""
            // }
            // helperText={
            //   !isEmpty(validate(email)) && email.length > 0
            //     ? validate(email)
            //     : ""
            // }
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
      </form>
    </Grid>
  );
};

export default withRouter(Login);
