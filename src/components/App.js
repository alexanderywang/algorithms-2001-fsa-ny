import React from "react";
import { BrowserRouter } from "react-router-dom";
import PairGenerator from "./PairGenerator";
import { Grid } from "@material-ui/core";

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
