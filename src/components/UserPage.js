import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function UserPage({ user }) {
  const [foundUser, setFoundUser] = useState("");
  useEffect(() => {
    if (user) {
      const response = async () => {
        await db
          .collection("Users")
          .doc(`${user.uid}`)
          .get()
          .then(async doc => {
            await setFoundUser(doc.data());
          })
          .catch(err => {
            console.error(err);
          });
      };
      response();
    }
  }, []);

  const { interviewer, interviewee, instructor, email } = foundUser;
  return (
    <Grid container flexGrow="1" spacing={4}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        item
        xs={4}
      >
        <Paper>
          <Typography variant="h3">{email}</Typography>
          <Typography>Turns as instructor: {instructor}</Typography>
          <Typography>Turns as intervierwer: {interviewer}</Typography>
          <Typography>Turns as intervierwee: {interviewee}</Typography>
        </Paper>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        item
        xs={4}
      ></Grid>
    </Grid>
  );
}
