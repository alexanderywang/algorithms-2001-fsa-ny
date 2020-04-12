import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../config/firebase";
import {
  Dialog,
  Divider,
  Grid,
  Paper,
  Typography,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button
} from "@material-ui/core";
import reacto from "../reacto.png";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function UserPage({ user }) {
  const classes = useStyles();

  const [foundUser, setFoundUser] = useState("");
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (user) {
      const response = async () => {
        await db
          .collection("Users")
          .doc(`${user.uid}`)
          .get()
          .then(doc => {
            setFoundUser(doc.data());
          })
          .catch(err => {
            console.error(err);
          });
      };
      response();
    }
  }, [user]);
  const handleCancel = e => {
    setOpen(false);
  };
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
  const handleSubmit = async e => {
    e.preventDefault();
    console.log("submitting!");
    await db
      .collection("Users")
      .doc(`${user.uid}`)
      .update({
        AMReacto: !!checked.includes("AM REACTO"),
        PMReacto: !!checked.includes("PM REACTO")
      })
      .then(response => console.log("updated"));
    setChecked([]);
    setOpen(true);
  };
  console.log("UserPage -> checked", checked);
  const { interviewer, interviewee, instructor, email, userName } = foundUser;
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
          <Typography variant="h3">{userName}</Typography>
          <Divider />
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
        <form onSubmit={handleSubmit}>
          <Typography variant="h5">Sign up by 8 PM for tomorrow</Typography>
          <List className={classes.root}>
            {["9:30 AM REACTO", "PM REACTO"].map((value, i) => {
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
          <Button type="submit">Submit</Button>
        </form>
      </Grid>
      <Grid xs={6} container direction="row">
        <Grid>
          <img alt="reacto" src={reacto} style={{ width: "100%" }} />

          <Link href="https://www.fullstackacademy.com/blog/whiteboard-coding-interviews-a-6-step-process-to-solve-any-problem">
            Fullstack REACTO
          </Link>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <Paper style={{ backgroundColor: "#fff" }}>
          <Typography
            id="form-dialog-title"
            align="center"
            style={{
              color: "#000",
              fontSize: 18,
              fontFamily: "Roboto",
              lineHeight: 3
            }}
          >
            THANKS FOR PARTICIPATING. RANDOM PAIRS WILL BE MADE AND A GIST WILL
            BE SENT OUT BY 8PM
          </Typography>
        </Paper>
      </Dialog>
    </Grid>
  );
}
