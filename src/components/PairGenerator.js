import React, { useState } from "react";
// import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Divider,
  Paper,
  Button,
  Link
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import reacto from "../reacto.png";

function PairGenerator() {
  const grads = [
    "Alex",
    "Stas",
    "🍔 Yan 👑",
    "April",
    "Max",
    "mark",
    "Mike D",
    "Nelson",
    "AAron",
    "Carlos",
    "Leslie",
    "Peter"
  ];
  const [pairs, setPairs] = useState([]);

  const randomize = () => {
    let array = grads.slice();
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    splitPairs(array);
  };

  const splitPairs = array => {
    const pairs = [];
    for (let i = 0; i < array.length; i += 2) {
      let pair = array.slice(i, i + 2);
      pairs.push(pair);
    }
    setPairs(pairs);
  };
  if (!pairs) return <Grid>No pairs yet</Grid>;
  return (
    <Grid>
      <Grid xs={6}>
        <Typography
          style={{
            color: "#000",
            fontSize: 18,
            fontFamily: "Roboto",
            lineHeight: 4
          }}
        >
          REACTO Algorithm Pairs
        </Typography>

        <Typography variant="h5" fontFamily="Roboto" lineHeight="4">
          LEAD INSTRUCTOR: 👨‍🏫 {grads[Math.floor(Math.random() * grads.length)]}{" "}
          👩‍🏫
        </Typography>

        <Button variant="contained" color="primary" onClick={randomize}>
          Make random pairs
        </Button>
        {pairs.map((pair, i) => (
          <Grid key={i}>
            <Typography>
              <PeopleIcon />
              Pair {i + 1}:{" "}
            </Typography>
            <Typography>Interviewer: {pair[0]}</Typography>
            <Typography>Interviewee: {pair[1]}</Typography>
            <Divider />
          </Grid>
        ))}
      </Grid>
      <Paper>
        <Grid xs={6} container direction="row">
          <img alt="reacto" src={reacto} style={{ width: "100%" }} />
        </Grid>
      </Paper>
      <Grid>
        <Link href="https://www.fullstackacademy.com/blog/whiteboard-coding-interviews-a-6-step-process-to-solve-any-problem">
          Fullstack REACTO
        </Link>
      </Grid>
    </Grid>
  );
}

export default PairGenerator;
