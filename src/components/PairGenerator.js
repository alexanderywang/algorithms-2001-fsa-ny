import React, { useState } from "react";
import { Grid, Typography, Divider, Button, Link } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import reacto from "../reacto.png";
import { db, firebase } from "../config/firebase";


function PairGenerator({user}) {
  const [pairs, setPairs] = useState([]);
  const [grads, setGrads] = useState([]);
  const [time, setTime] = useState("");
  const [instructor, setInstructor] = useState("");
  const [interviewers, setInterviewers] = useState([])
  const [interviewees, setInterviewees] = useState([])

  const resetChoices = () => {
    //update all users to reflect AMReacto, PMReacto: false
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
    }
    pairs.forEach(pair => {
      setInterviewers(prevPairs => [...prevPairs, pair[0]])
      setInterviewees(prevPairs => [...prevPairs, pair[1]])
    })

    setPairs(pairs);
    setInstructor(pairs[0][0]);
  };

  const updateStats = async instructorName => {
    //update instructor count
    await db
      .collection("Users")
      .where("userName", "==", instructorName)
      .get()
      .then(snapshot => {
        snapshot.forEach(async doc => {
          await db
          .collection("Users")
          .doc(doc.id)
          .update({
            instructor: firebase.firestore.FieldValue.increment(1)
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
    // //update interviewer count
    interviewers.forEach(async interviewer => {
      await db
        .collection("Users")
        .where("userName", "==", interviewer)
        .get()
        .then(snapshot => {
          snapshot.forEach(async doc => {
            await db
            .collection("Users")
            .doc(doc.id)
            .update({
              interviewer: firebase.firestore.FieldValue.increment(1)
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    });
    // //update interviewee count
    interviewees.forEach(async interviewee => {
      await db
        .collection("Users")
        .where("userName", "==", interviewee)
        .get()
        .then(snapshot => {
          snapshot.forEach(async doc => {
            await db
            .collection("Users")
            .doc(doc.id)
            .update({
              interviewee: firebase.firestore.FieldValue.increment(1)
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    });
    console.log("updated");
  };
console.log(user)
  if (!pairs) return <Grid>No pairs yet</Grid>;

  return (
    <Grid
      style={{ paddingTop: 64 }}
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid item xs={6}>
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

        <Typography variant="h5" fontFamily="Roboto" lineheight="4">
          {time} REACTO LEAD INSTRUCTOR: 👨‍🏫 {instructor} 👩‍🏫
        </Typography>

        <Button
          variant="contained"
          color="inherit"
          onClick={randomize}
          disableRipple={true}
        >
          <PeopleOutlineIcon/>Make random pairs
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

      <Grid item xs={6} container direction="row">
        <Grid>
          <img alt="reacto" src={reacto} style={{ width: "100%" }} />

          <Link target="_blank" href="https://www.fullstackacademy.com/blog/whiteboard-coding-interviews-a-6-step-process-to-solve-any-problem">
            Fullstack REACTO
          </Link>
        </Grid>
        {/* Admin ONLY */}
        {user.email === "alex@wang.com" && (<Grid>
          <Button
            variant="contained"
            color="inherit"
            onClick={getAMPairs}
            disableRipple={true}
          >
            1. Get AM Participants
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => updateStats(instructor)}
            disableRipple={true}
          >
            2. update everyone's interview stats
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={getPMPairs}
            disableRipple={true}
          >
            3. Get PM Participants
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={updateStats}
            disableRipple={true}
          >
            4. update everyone's interview stats
          </Button>
          <Divider />
          <Button
            variant="contained"
            color="inherit"
            onClick={resetChoices}
            disableRipple={true}
          >
            5. Reset all choices AFTER assigning pairs for the day
          </Button>
        </Grid>)}
        <Divider />
      </Grid>
    </Grid>
  );
}

export default PairGenerator;
