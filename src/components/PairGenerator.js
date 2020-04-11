import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Grid, Typography, Divider } from "@material-ui/core";

function PairGenerator() {
  const grads = [
    "Alex",
    "Stas",
    "Yan",
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
    console.log("randomize -> array", array);
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    console.log("random?", array);
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
  console.log(pairs);
  if (!pairs) return <Grid>No pairs yet</Grid>;
  return (
    <Grid>
      <Typography
        style={{
          color: "#000",
          fontSize: 18,
          fontFamily: "Roboto",
          lineHeight: 4
        }}
      >
        Full Stack RANDOM Algo Pairs
      </Typography>

      <Typography
        style={{
          marginLeft: "15px",
          color: "#000",
          fontSize: 14,
          fontFamily: "Roboto",
          lineHeight: 4
        }}
      >
        LEAD INSTRUCTOR: {grads[Math.floor(Math.random() * grads.length)]}
      </Typography>

      <Button variant="contained" color="primary" onClick={randomize}>
        Make random pairs
      </Button>
      {pairs.map((pair, i) => (
        <Grid key={i}>
          <Typography>Pair {i + 1}: </Typography>
          <Typography>Interviewer: {pair[0]}</Typography>
          <Typography>Interviewee: {pair[1]}</Typography>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}

export default PairGenerator;
