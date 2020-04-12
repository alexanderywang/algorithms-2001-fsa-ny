import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  // demo: {
  //   backgroundColor: theme.palette.background.paper
  // },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

export default function Behavioral() {
  const classes = useStyles();
  const [dense, setDense] = useState(false);

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
      </Grid>
      <Grid item md={6} spacing={2}>
        <Typography variant="h6" className={classes.title}>
          From themuse.com: <Typography> </Typography>
          <Link href="https://www.themuse.com/advice/30-behavioral-interview-questions-you-should-be-ready-to-answer.com/">
            https://www.themuse.com/advice/30-behavioral-interview-questions-you-should-be-ready-to-answer.com/
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

// {

//         <Typography> </Typography>
//         <Typography>
//           Interview prep 101 dictates that you should have your elevator pitch
//           ready, a few stories polished (for the behavioral interview questions
//           you’ll probably be asked), and a good sense of what you have to offer.
//           So, how do you get there? Lots of practice, ideally aloud.
//         </Typography>
//         <Typography> </Typography>
//         <Typography>
//           Behavioral interview questions require candidates to share examples of
//           specific situations they’ve been in where they had to use certain
//           skills. According to the Society for Human Resource Management, the
//           answers “should provide verifiable, concrete evidence as to how a
//           candidate has dealt with issues in the past.” In short, it’s a way to
//           let your past work performance prove what you’re capable of doing in
//           the future for this potential employer. Not sure how to answer these
//           questions from your interviewer? Here’s a quick guide on how to craft
//           job-landing responses using
//           <Link href="https://www.themuse.com/advice/star-interview-method">
//             the STAR interview method.
//           </Link>
//         </Typography>
//         <Typography> </Typography>
//         <Typography>
//           Behavioral Interview Questions 1-5 Teamwork For questions like these,
//           you want a story that illustrates your ability to work with others
//           under challenging circumstances. Think team conflict, difficult
//           project constraints, or clashing personalities. Talk about a time when
//           you had to work closely with someone whose personality was very
//           different from yours. Give me an example of a time you faced a
//           conflict while working on a team. How did you handle that? Describe a
//           time when you struggled to build a relationship with someone
//           important. How did you eventually overcome that? We all make mistakes
//           we wish we could take back. Tell me about a time you wish you’d
//           handled a situation differently with a colleague. Tell me about a time
//           you needed to get information from someone who wasn’t very responsive.
//           What did you do? Behavioral Interview Questions 6-10 Client-facing
//           Skills If the role you’re interviewing for works with clients,
//           definitely be ready for one of these. Find an example of a time where
//           you successfully represented your company or team and delivered
//           exceptional customer service. Describe a time when it was especially
//           important to make a good impression on a client. How did you go about
//           doing so? Give me an example of a time when you did not meet a
//           client’s expectation. What happened, and how did you attempt to
//           rectify the situation? Tell me about a time when you made sure a
//           customer was pleased with your service. Describe a time when you had
//           to interact with a difficult client. What was the situation, and how
//           did you handle it? When you’re working with a large number of
//           customers, it’s tricky to deliver excellent service to them all. How
//           do you go about prioritizing your customers’ needs? Behavioral
//           Interview Questions 11-15 Ability to Adapt Times of turmoil are
//           finally good for something! Think of a recent work crisis you
//           successfully navigated. Even if your navigation didn’t feel successful
//           at the time, find a lesson or silver lining you took from the
//           situation. Tell me about a time you were under a lot of pressure. What
//           was going on, and how did you get through it? Describe a time when
//           your team or company was undergoing some change. How did that impact
//           you, and how did you adapt? Tell me about the first job you’ve ever
//           had. What did you do to learn the ropes? Give me an example of a time
//           when you had to think on your feet in order to delicately extricate
//           yourself from a difficult or awkward situation. Tell me about a time
//           you failed. How did you deal with the situation? Behavioral Interview
//           Questions 16-20 Time Management Skills In other words, get ready to
//           talk about a time you juggled multiple responsibilities, organized it
//           all (perfectly), and completed everything before the deadline. Tell me
//           about a time you had to be very strategic in order to meet all your
//           top priorities. Describe a long-term project that you managed. How did
//           you keep everything moving along in a timely manner? Sometimes it’s
//           just not possible to get everything on your to-do list done. Tell me
//           about a time your responsibilities got a little overwhelming. What did
//           you do? Tell me about a time you set a goal for yourself. How did you
//           go about ensuring that you would meet your objective? Give me an
//           example of a time you managed numerous responsibilities. How did you
//           handle that? Behavioral Interview Questions 21-25 Communication Skills
//           You probably won’t have any trouble thinking of a story for
//           communication questions, since it’s not only part of most jobs; it’s
//           part of everyday life. However, the thing to remember here is to also
//           talk about your thought process or preparation. Give me an example of
//           a time when you were able to successfully persuade someone to see
//           things your way at work. Describe a time when you were the resident
//           technical expert. What did you do to make sure everyone was able to
//           understand you? Tell me about a time when you had to rely on written
//           communication to get your ideas across to your team. Give me an
//           example of a time when you had to explain something fairly complex to
//           a frustrated client. How did you handle this delicate situation? Tell
//           me about a successful presentation you gave and why you think it was a
//           hit. Behavioral Interview Questions 26-30 Motivation and Values A lot
//           of seemingly random interview questions are actually attempts to learn
//           more about what motivates you. Your response would ideally address
//           this directly even if the question wasn’t explicit about it. Tell me
//           about your proudest professional accomplishment. Describe a time when
//           you saw some problem and took the initiative to correct it rather than
//           waiting for someone else to do it. Tell me about a time when you
//           worked under close supervision or extremely loose supervision. How did
//           you handle that? Give me an example of a time you were able to be
//           creative with your work. What was exciting or difficult about it? Tell
//           me about a time you were dissatisfied in your work. What could have
//           been done to make it better?
//         </Typography> */
// }
