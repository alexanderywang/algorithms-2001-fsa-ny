import React from 'react';
import { Paper, Grid, Typography, List, ListItemText, ListItem, ListItemIcon, Link } from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import categories from '../categories.png';

let links = [
  'https://leetcode.com/',
  'https://www.educative.io/','https://www.algoexpert.io/product','https://www.interviewcake.com/table-of-contents','https://www.educative.io/courses/grokking-the-object-oriented-design-interview','https://leetcode.com/tag/stack/','https://www.interviewcake.com/article/python/data-structures-coding-interview','https://www.interviewcake.com/concept/java/hash-map','https://www.interviewcake.com/data-structures-and-algorithms-guide','https://docs.google.com/spreadsheets/d/1Y98QKaYPazWImEt1nA_ocpGNJ-yQjH1FAsVQhUQ7OTw/edit#gid=0','https://visualgo.net/en','https://algoviz.io/','https://clementmihailescu.github.io/Sorting-Visualizer/',"https://hackerrank.com",'https://codewars.com', "https://projecteuler.net/archives", 'https://workshape.github.io/visual-graph-algorithms/', 'https://qiao.github.io/PathFinding.js/visual/', 'https://www.toptal.com/developers/sorting-algorithms', 'https://leetcode.com/articles/trapping-rain-water/'
];

export default function UserPage() {
  return (
    <Grid container flexgrow='1' spacing={4}>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        item
        xs={3}
      >
        <Paper>
          <Typography>
            <b>Algos Format:</b>{' '}
          </Typography>
          <List>
            <ListItemText /> People sign up day before.
          </List>
          <List>
            <ListItemText /> Pairs are generated.
          </List>
          <List>
            <ListItemText /> Problem distributed for Interviewers to
            familiarize.
          </List>
          <List>
            <ListItemText /> Interviewers can meet at 9:30 and interviewees can
            show up 10-15 minutes later.
          </List>
          <List>
            <ListItemText /> Algos will start out easy, especially for newer
            topics/strategies.
          </List>
          <List>
            <ListItemText /> Whiteboarding will be encouraged but not enforced.
          </List>
          <List>
            <ListItemText /> Possible second round scheduled for later in the
            day or evening, likely same subject but harder, pending
            availability.
          </List>
          <List>
            <ListItemText /> Also for medium+ difficulty, we can involve some
            pairs programming as we get better at the topics.
          </List>
          <List>
            <ListItemText />   <b>Systems Design: </b>
          <List>
            <ListItemText /> Interviewers should design their own & meet up the
            prior to cover anything missed
          </List>
          <List>
            <ListItemText /> Interviewees time to come up with their own, and
            then have everyone meet back and discuss.
          </List>
          <List>
            <ListItemText /> Ideally time leftover to cover the actual coding
            process
          </List>
          </List>
          <List>
            <ListItemText /> Mock Behavioral Questions on Friday
          </List>
        </Paper>{' '}
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        item
        xs={3}
      >
        <Paper>
          <Typography>educative.io Categories</Typography>
          <img alt='categories' src={categories} style={{ width: '100%' }} />
        </Paper>
      </Grid>
      <Grid
        item
        md={6}
        spacing={2}
        container
        justify='center'
        alignItems='flex-start'
      >
        <Typography variant='h6' >
          Additional Algorithms Links<Typography> </Typography>
        </Typography>

        <List >
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
    </Grid>
  );
}
