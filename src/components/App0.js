import React from "react";
import { BrowserRouter } from "react-router-dom";
import PairGenerator from "./PairGenerator";
import { Grid } from "@material-ui/core";


// load all users from firestore
// home page will be user, stats, checkbox for AM/PM REACTO for the next day
// array filtered for true will be passed to PairGenerator Component

function App() {
  return (
    <BrowserRouter>
      <Grid>
        <PairGenerator />
      </Grid>
    </BrowserRouter>
  );
}

export default App;
