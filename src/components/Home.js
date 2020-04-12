import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";

const Home = ({ user }) => {
  console.log("Home -> user", user);
  return (
    <Grid container direction="column" style={{ marginTop: "10em" }}>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: "1.5em" }}
        >
          <Grid item>
            <Typography
              variant="h4"
              style={{ marginRight: "5px", color: "#000" }}
              gutterBottom
            >
              Welcome{" "}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              style={{
                fontFamily: "Roboto",
                fontWeight: 200,
                fontSize: 30,
                color: "#000"
              }}
              gutterBottom
            >
              {!user ? " " : user.email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="center" alignItems="center">
        {user && (
          <Link to="/userpage" style={{ textDecoration: "none" }}>
            <Typography
              style={{ marginTop: "10px", color: "#818181" }}
              align="center"
            >
              Practice your algos
            </Typography>
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
