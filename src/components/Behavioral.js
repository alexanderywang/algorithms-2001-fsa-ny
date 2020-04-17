import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import bootcampElements from '../bootcampElements.png';

let launchDayNonTechnical = [
  'Why did you decide to become a programmer?',
  'Do you prefer front-end or back-end programming?',
  'What language do you prefer?',
  'Would you learn other languages?',
  'Why did you come to Fullstack?',
  'When you are learning something new, what do you do first?',
  'When do you ask questions?',
  'What are you interested in? / What are you looking for?',
  'Where do you see yourself in the future / in 5 years?',
];

let launchDayTechnical = [
  'Why do you use react?',
  'What are the advantages of using react?',
  'What are some of the challenges around architecting a site w/ React & Redux?',
  'What is Sequelize?',
  'Identify a function that takes a number n and returns the nth number in the fibonacci sequence; discuss code that uses nested for loops to print out a multiplication table; discuss a time while working on your project when everything broke',
  'How do you modularize your CSS files?',
  'What’s the hardest issue you had to resolve recently, specifically in code.',
  'When should a NoSQL database be used instead of a relational database, and vice versa?',
];
let launchDayProjects = [
  'What challenges did you face?',
  'What were some of the things you worked on?',
  'What other features would you like to add?',
  'What were some bugs you had and how did you fix it?',
  'Why did you use a certain type of technology for your project?',
  'Tell me about a conflict you had on a team.',
];

let questions = [
  'Tell me about yourself and what got you interested in engineering?',
  'Tell me about a group project that you are passionate about. What was it and what was your contribution?',
  'What are your strengths as a developer?',
  'What are your weaknesses? Another Way: What are you improving on?',
  'How would your peers / coworkers describe you?',
  'What kind of work environment are you looking for in the next opportunity you take?',
  'How did you hear about this opportunity / what do you know about X company?',
  'What is your understanding of the role?',
  'Tell me about a time when you and your teammates did not agree. How did you communicate your frustrations and what was the outcome?',
  'Where do you see yourself in 3-5 years?',
  'How do you stay up-to-date on your technical skills? What are you currently working on?',
  'Describe your perfect engineering job.',
  'Name a time when you suggested an idea and followed through with it. What was the outcome?',
  'Discuss a time when a task was unclear. How did you respond?',
  'Discuss a time when you had a lot on your plate. How did you prioritize?',
  'Tell me about a time you had to change or adapt a process. What was the context and result?',
  'Discuss a professional accomplishment that you are most proud of.',
  'What is your approach to balancing multiple, sometimes unexpected, tasks?',
  'Discuss a time when your manager gave you feedback / presented a development opportunity. What was it and how did you respond?',
  'What do you value most?',
  'What is your ideal culture? Describe a work environment where you would thrive.',
  'Why do you want to work on this product / in this industry?',
  'Discuss a time when you made a mistake. How did you handle it?',
  'Example of a time you used creativity or innovation to solve a problem.',
  'What is your definition of a great manager? Describe the management style that will bring forth your best work and effort.',
  'Discuss a time when you disagreed with your Manager. How did you handle the situation?',
  'What did you find most challenging about your last job?',
  'What other companies and roles are you applying to right now?',
  'What have you been doing since graduating Fullstack / GH?',
];

let links = [
  'https://www.themuse.com/advice/30-behavioral-interview-questions-you-should-be-ready-to-answer',
  'https://docs.google.com/document/d/1sUc4jn3JgenOAg49OG7adQxGet0nzz-wWhTJqNT1628/edit',
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexgrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function Behavioral() {
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [random, setRandom] = useState('');
  const [randomNT, setRandomNT] = useState('');
  const [randomT, setRandomT] = useState('');
  const [randomP, setRandomP] = useState('');

  const randomQ = (array, type) => {
    switch (type) {
      case 'nt':
        return setRandomNT(array[Math.floor(Math.random() * array.length)]);
      case 't':
        return setRandomT(array[Math.floor(Math.random() * array.length)]);
      case 'p':
        return setRandomP(array[Math.floor(Math.random() * array.length)]);
      default:
        return setRandom(array[Math.floor(Math.random() * array.length)]);
    }
  };

  return (
    <Grid container direction='row' justify='center' alignItems='flex-start'>
      <Grid
        item
        md={6}
        spacing={2}
        container
        justify='center'
        alignItems='flex-start'
      >
        <Typography variant='h6' className={classes.title}>
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
          variant='contained'
          color='inherit'
          onClick={() => randomQ(questions, 'b')}
          disableRipple={true}
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
        justify='center'
        alignItems='flex-start'
      >
        <Typography variant='h6' className={classes.title}>
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
                  <Link target="_blank" href={`${link}`}>{`${link}`}</Link>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Divider />
      <Grid
        item
        md={4}
        spacing={2}
        container
        justify='center'
        alignItems='flex-start'
      >
        <Typography variant='h6' className={classes.title}>
          Launch Day Non-technical Questions
        </Typography>

        <List dense={dense}>
          {launchDayNonTechnical.map((question, i) => {
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
          variant='contained'
          color='inherit'
          onClick={() => randomQ(launchDayNonTechnical, 'nt')}
          disableRipple={true}
        >
          ? Random Non-technical Question ?
        </Button>
        <Grid>
          <Typography>{randomNT}</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        md={4}
        spacing={2}
        container
        justify='center'
        alignItems='flex-start'
      >
        <Typography variant='h6' className={classes.title}>
          Launch Day Technical Questions
        </Typography>

        <List dense={dense}>
          {launchDayTechnical.map((question, i) => {
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
          variant='contained'
          color='inherit'
          onClick={() => randomQ(launchDayTechnical, 't')}
          disableRipple={true}
        >
          ? Random Technical Question ?
        </Button>
        <Grid>
          <Typography>{randomT}</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        md={4}
        spacing={2}
        container
        justify='center'
        alignItems='flex-start'
      >
        <Typography variant='h6' className={classes.title}>
          Launch Day Project Questions
        </Typography>

        <List dense={dense}>
          {launchDayProjects.map((question, i) => {
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
          variant='contained'
          color='inherit'
          onClick={() => randomQ(launchDayProjects, 'p')}
          disableRipple={true}
        >
          ? Random Project Question ?
        </Button>
        <Grid>
          <Typography>{randomP}</Typography>
        </Grid>
      </Grid>
      {/* <Grid xs={4} container direction="row" >
        <Grid>
          <img
            alt="bootcampElements"
            src={bootcampElements}
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid> */}
    </Grid>
  );
}
