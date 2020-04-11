import React from "react";
import { firebase } from "../config/firebase.js";
import { Button, Typography } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Typography>Home</Typography>
      {/* <Button onClick={() => firebase.auth().signOut()}>Sign out</Button> */}
    </>
  );
};

export default Home;
