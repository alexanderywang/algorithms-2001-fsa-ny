import React from "react";
import { Grid, Link, Typography } from "@material-ui/core";
import arraySortingAlgorithms from "../arraySortingAlgorithms.png";
import dataStructureOperations from "../dataStructureOperations.png";
import BigOComplexity from "../BigOComplexity.png";

export default function Complexities() {
  return (
    <Grid>
      <Grid>
        <Typography>
          Taken from{" "}
          <Link href="https://www.bigocheatsheet.com/">
            https://www.bigocheatsheet.com/
          </Link>
        </Typography>
        <Typography>
          This webpage covers the space and time Big-O complexities of common
          algorithms used in Computer Science. When preparing for technical
          interviews in the past, I found myself spending hours crawling the
          internet putting together the best, average, and worst case
          complexities for search and sorting algorithms so that I wouldn't be
          stumped when asked about them. Over the last few years, I've
          interviewed at several Silicon Valley startups, and also some bigger
          companies, like Google, Facebook, Yahoo, LinkedIn, and Uber, and each
          time that I prepared for an interview, I thought to myself "Why hasn't
          someone created a nice Big-O cheat sheet?". So, to save all of you
          fine folks a ton of time, I went ahead and created one. Enjoy! - Eric
        </Typography>
      </Grid>
      <Grid>
        <img
          alt="BigOComplexity"
          src={BigOComplexity}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid>
        <img
          alt="dataStructureOperations"
          src={dataStructureOperations}
          style={{ width: "100%" }}
        />
      </Grid>

      <Grid>
        <img
          alt="arraySortingAlgorithms"
          src={arraySortingAlgorithms}
          style={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
