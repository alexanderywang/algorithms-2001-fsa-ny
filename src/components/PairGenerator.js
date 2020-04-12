import React, { useState } from "react";
import { Grid, Typography, Divider, Button, Link } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import reacto from "../reacto.png";
import { db } from "../config/firebase";

function PairGenerator() {
  // const grads = [
  //   "Alex",
  //   "Stas",
  //   "🍔 Yan 👑",
  //   "April",
  //   "Max",
  //   "mark",
  //   "Mike D",
  //   "Nelson",
  //   "AAron",
  //   "Carlos",
  //   "Leslie",
  //   "Peter"
  // ];
  const [pairs, setPairs] = useState([]);
  const [grads, setGrads] = useState([]);

  const resetChoices = () => {
    //update all users to reflect AMReacto, PMReacto: falseå
    db.collection("Users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var cityRef = db.collection("cities").doc(doc.id);

          return cityRef.update({
            AMReacto: false,
            PMReacto: false
          });
        });
      });
  };
  const getAMPairs = async () => {
    const participants = [];
    await db
      .collection("Users")
      .where("AMReacto", "==", true)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          participants.push(doc.data().userName);
          setGrads([...participants]);
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  const getPMPairs = async () => {
    const participants = [];
    await db
      .collection("Users")
      .where("PMReacto", "==", true)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          participants.push(doc.data().userName);
          setGrads([...participants]);
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
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
    const interviewers = [];
    const interviewees = [];
    for (let i = 0; i < array.length; i += 2) {
      let pair = array.slice(i, i + 2);
      pairs.push(pair);
      interviewees.push(pair[0]);
      interviewers.push(pair[1]);
    }
    // pairs.forEach(pair => {
    //   interviewees.push(pair[0]);
    //   interviewers.push(pair[1]);
    // });
    console.log("PairGenerator -> interviewers", interviewers);
    console.log("PairGenerator -> interviewees", interviewees);
    setPairs(pairs);
  };
  console.log("PairGenerator -> grads", grads);
  if (!pairs) return <Grid>No pairs yet</Grid>;
  return (
    <Grid
      style={{ paddingTop: 64 }}
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
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

        <Button
          variant="contained"
          color="#474747"
          onClick={randomize}
          disableRipple="true"
        >
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

      <Grid xs={6} container direction="row">
        <Button
          variant="contained"
          color="#474747"
          onClick={getAMPairs}
          disableRipple="true"
        >
          Get AM Participants
        </Button>
        <Button
          variant="contained"
          color="#2b2d2f"
          onClick={getPMPairs}
          disableRipple="true"
        >
          Get PM Participants
        </Button>
        <Grid>
          <img alt="reacto" src={reacto} style={{ width: "100%" }} />

          <Link href="https://www.fullstackacademy.com/blog/whiteboard-coding-interviews-a-6-step-process-to-solve-any-problem">
            Fullstack REACTO
          </Link>
        </Grid>
        <Divider />
        <Button
          variant="contained"
          color="#474747"
          onClick={resetChoices}
          disableRipple="true"
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}

export default PairGenerator;
