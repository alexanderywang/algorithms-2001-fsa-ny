import React from 'react';
import { Paper, Grid, Typography, List, ListItemText } from '@material-ui/core';
import categories from '../categories.png';

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
          <Typography>
            <b>Systems Design: </b>
          </Typography>
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
        </Paper>
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
          <Typography>Mock Behavioral Questions on Friday</Typography>
        </Paper>
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
    </Grid>
  );
}
