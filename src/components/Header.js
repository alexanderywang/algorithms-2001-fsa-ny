import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Tabs, Tab, Grid, Button, Toolbar, AppBar } from "@material-ui/core/";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
import "firebase/auth";
import Login from "./Login";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: "20px",
    "&:hover": {
      backgroundColor: "transparent"
    },
    fontWeight: 400,
    textTransform: "none",
    borderRadius: 5,
    height: 46,
    padding: 10
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    textTransform: "none",
    fontWeight: 400,
    fontSize: "1rem",
    minWidth: 10,
    marginLeft: "25px",
    color: "#000",
    fontFamily: "Roboto"
  }
}));

export default function Header({ currentUser }) {
  const classes = useStyles();

  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleClick = e => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location = "/";
        return <Redirect to="/" />;
      });
  };

  if (!currentUser) {
    return (
      <React.Fragment>
        <AppBar position="fixed" style={{ background: "#fff" }}>
          <Toolbar>
            <Button
              component={Link}
              to="/"
              disableRipple
              style={{
                fontFamily: "Roboto",
                fontWeight: 200,
                fontSize: 28,
                color: "#000"
              }}
              className={classes.button}
            >
              algos.
            </Button>
            <Grid className={classes.tabContainer}>
              <Tab
                className={classes.tab}
                component={Link}
                to="/signup"
                label="Sign up"
              />
            </Grid>
            <Grid className={classes.tabContainer}>
              <Tab
                className={classes.tab}
                component={Link}
                to="/login"
                label="Log In"
              />
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <AppBar position="fixed" style={{ background: "#fff" }}>
        <Toolbar>
          <Button
            component={Link}
            to="/"
            disableRipple
            style={{
              fontFamily: "Roboto",
              fontWeight: 200,
              fontSize: 28,
              color: "#000"
            }}
            className={classes.button}
          >
            algos.
          </Button>
          <Grid className={classes.tabContainer}>
            {/* <Tab
              className={classes.tab}
              component={Link}
              to="/dashboard"
              label="Dashboard"
            /> */}

            <Tab
              className={classes.tab}
              component={Link}
              to="/"
              label="Log out"
              onClick={handleClick}
            />
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.toolBarMargin} />
    </React.Fragment>
  );
}
