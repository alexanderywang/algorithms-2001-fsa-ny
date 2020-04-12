import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../config/firebase";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function UserPage({ user }) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);

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

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const onSubmit = async e => {
    e.preventDefault();
    await db
      .collection("Users")
      .doc(`${user.uid}`)
      .update({
        AMReacto: checked.includes("AM Reacto"),
        PMReacto: checked.includes("PM Reacto")
      }).then(response => console.log("updated"))
  };
  console.log("UserPage -> checked", checked);
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
      >
        <Typography variant="h5">Sign up</Typography>
        <List className={classes.root}>
          {["AM REACTO", "PM REACTO"].map((value, i) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={i}
                role={undefined}
                dense
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    style={{
                      color: "#2b2d2f"
                    }}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItem>
            );
          })}
        </List>
        <Button onSubmit={onSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
}
