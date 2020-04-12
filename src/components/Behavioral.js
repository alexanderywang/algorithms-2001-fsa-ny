import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

let questions = [
  "Tell me about yourself and what got you interested in engineering?",
  "Tell me about a group project that you are passionate about. What was it and what was your contribution?",
  "What are your strengths as a developer?",
  "What are your weaknesses? Another Way: What are you improving on?",
  "How would your peers / coworkers describe you?",
  "What kind of work environment are you looking for in the next opportunity you take?",
  "How did you hear about this opportunity / what do you know about X company?",
  "What is your understanding of the role?",
  "Tell me about a time when you and your teammates did not agree. How did you communicate your frustrations and what was the outcome?",
  "Where do you see yourself in 3-5 years?",
  "How do you stay up-to-date on your technical skills? What are you currently working on?",
  "Describe your perfect engineering job.",
  "Name a time when you suggested an idea and followed through with it. What was the outcome?",
  "Discuss a time when a task was unclear. How did you respond?",
  "Discuss a time when you had a lot on your plate. How did you prioritize?",
  "Tell me about a time you had to change or adapt a process. What was the context and result?",
  "Discuss a professional accomplishment that you are most proud of.",
  "What is your approach to balancing multiple, sometimes unexpected, tasks?",
  "Discuss a time when your manager gave you feedback / presented a development opportunity. What was it and how did you respond?",
  "What do you value most?",
  "What is your ideal culture? Describe a work environment where you would thrive.",
  "Why do you want to work on this product / in this industry?",
  "Discuss a time when you made a mistake. How did you handle it?",
  "Example of a time you used creativity or innovation to solve a problem.",
  "What is your definition of a great manager? Describe the management style that will bring forth your best work and effort.",
  "Discuss a time when you disagreed with your Manager. How did you handle the situation?",
  "What did you find most challenging about your last job?",
  "What other companies and roles are you applying to right now?",
  "What have you been doing since graduating Fullstack / GH?"
];

let links = [
  "https://www.themuse.com/advice/30-behavioral-interview-questions-you-should-be-ready-to-answer",
  "https://docs.google.com/document/d/1sUc4jn3JgenOAg49OG7adQxGet0nzz-wWhTJqNT1628/edit"
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

export default function Behavioral() {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [random, setRandom] = useState("");

  const randomQ = () => {
    setRandom(questions[Math.floor(Math.random() * questions.length)]);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid
        item
        md={6}
        spacing={2}
        container
        justify="center"
        alignItems="flex-start"
      >
        <Typography variant="h6" className={classes.title}>
          Some Sample Behavioral Questions
        </Typography>

        <List dense={dense}>
          {questions.map((question, i) => {
            return (
              <ListItem key={i}>
                <ListItemIcon>
                  <DoubleArrowIcon />
                </ListItemIcon>
                <ListItemText>{`${question}`}</ListItemText>
              </ListItem>
            );
          })}
        </List>
        <Button
          variant="contained"
          color="#474747"
          onClick={randomQ}
          disableRipple="true"
        >
          ? Random Question ?
        </Button>
        <Grid>
          <Typography>{random}</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        md={6}
        spacing={2}
        container
        justify="center"
        alignItems="flex-start"
      >
        <Typography variant="h6" className={classes.title}>
          Additional Behavioral & Interview Links<Typography> </Typography>
        </Typography>

        <List dense={dense}>
          {links.map((link, i) => {
            return (
              <ListItem key={i}>
                <ListItemIcon>
                  <DoubleArrowIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link href={`${link}`}>{`${link}`}</Link>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}
