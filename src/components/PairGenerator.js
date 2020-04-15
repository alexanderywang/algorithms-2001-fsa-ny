import React, { useState } from "react";
import { Grid, Typography, Divider, Button, Link } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import reacto from "../reacto.png";
import { db, firebase } from "../config/firebase";
import { ConsoleWriter } from "istanbul-lib-report";

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
  const [time, setTime] = useState("");
  const [instructor, setInstructor] = useState("");
  const interviewers = [];
  const interviewees = [];
  const resetChoices = () => {
    //update all users to reflect AMReacto, PMReacto: falseå
    db.collection("Users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var userRef = db.collection("Users").doc(doc.id);

          return userRef.update({
            AMReacto: false,
            PMReacto: false
          });
        });
      });
    console.log("Reset");
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
    setTime("AM");
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
    setTime("PM");
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

    for (let i = 0; i < array.length; i += 2) {
      let pair = array.slice(i, i + 2);
      pairs.push(pair);
      interviewers.push(pair[0]);
      interviewees.push(pair[1]);
    }

    console.log("PairGenerator -> interviewers", interviewers);
    console.log("PairGenerator -> interviewees", interviewees);
    setPairs(pairs);
    setInstructor(interviewers[0]);
  };
  console.log("PairGenerator -> grads", grads);
  const updateStats = async () => {
    //update instructor count
    await db
      .collection("Users")
      .where("userName", "==", "instructor")
      .get()
      .then(doc => {
        console.log(doc.id);
        db.collection("Users")
          .doc(doc.id)
          .update({
            instructor: firebase.firestore.FieldValue.increment(1)
          });
      });
    //update interviewer count
    interviewers.forEach(async interviewer => {
      await db
        .collection("Users")
        .where("userName", "==", "interviewer")
        .get()
        .then(doc => {
          console.log(doc.id);
          db.collection("Users")
            .doc(doc.id)
            .update({
              interviewer: firebase.firestore.FieldValue.increment(1)
            });
        });
    });
    //update interviewee count
    interviewees.forEach(async interviewee => {
      await db
        .collection("Users")
        .where("userName", "==", "interviewee")
        .get()
        .then(doc => {
          console.log(doc.id);
          db.collection("Users")
            .doc(doc.id)
            .update({
              interviewee: firebase.firestore.FieldValue.increment(1)
            });
        });
    });
    console.log("updated");
  };

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
          {time} REACTO LEAD INSTRUCTOR: 👨‍🏫 {instructor} 👩‍🏫
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
        <Grid>
          <img alt="reacto" src={reacto} style={{ width: "100%" }} />

          <Link href="https://www.fullstackacademy.com/blog/whiteboard-coding-interviews-a-6-step-process-to-solve-any-problem">
            Fullstack REACTO
          </Link>
        </Grid>
        {/* Admin ONLY */}
        <Grid>
          <Button
            variant="contained"
            color="#474747"
            onClick={getAMPairs}
            disableRipple="true"
          >
            1. Get AM Participants
          </Button>
          {/* <Button
            variant="contained"
            color="#474747"
            onClick={updateStats}
            disableRipple="true"
          >
            2. update everyone's interview stats
          </Button> */}
          <Button
            variant="contained"
            color="#2b2d2f"
            onClick={getPMPairs}
            disableRipple="true"
          >
            3. Get PM Participants
          </Button>
          {/* <Button
            variant="contained"
            color="#474747"
            onClick={updateStats}
            disableRipple="true"
          >
            4. update everyone's interview stats
          </Button> */}
          <Divider />
          {/* <Button
            variant="contained"
            color="#474747"
            onClick={resetChoices}
            disableRipple="true"
          >
            5. Reset all choices AFTER assigning pairs for the day
          </Button> */}
        </Grid>
        <Divider />
      </Grid>
    </Grid>
  );
}

export default PairGenerator;
