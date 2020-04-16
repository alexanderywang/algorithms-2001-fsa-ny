import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  TextField,
  Typography
} from "@material-ui/core";
import { db } from "../config/firebase";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

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
  const [archives, setArchives] = useState([]);
  const [archive, setArchive] = useState("");

  useEffect(() => {
    const arch = [];
    const response = async () => {
      await db
        .collection("Archives")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log("response -> doc", doc.data());
            arch.push({ ...doc.data() });
            setArchives([...arch]);

            // setArchives(prevArchives => [...prevArchives, archive]);
          });
        })
        .catch(err => {
          console.error(err);
        });
    };
    response();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("handle submit", archive);
    await db
      .collection("Archives")
      .add({ archive, createdAt: new Date() })
      .then(response => {
        setArchives(prevArchives => [
          ...prevArchives,
          { archive, createdAt: { seconds: new Date().getTime() / 1000 } }
        ]);
      })
      .catch(function(error) {
        console.error(error);
      });
    setArchive("");
  };

  const randomQ = array => {
    return setRandom(array[Math.floor(Math.random() * array.length)].archive);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid>
        <form onSubmit={handleSubmit}>
          <Grid item xs={6} sm={6}>
            <TextField
              label="Add URL"
              variant="outlined"
              type="text"
              value={archive}
              onChange={e => setArchive(e.target.value)}
              fullWidth
            />
          </Grid>
          <Button
            variant="contained"
            color="#A9A9A9"
            type="submit"
            onClick={e => handleSubmit}
            className={classes.button}
          >
            Add to Archives{" "}
          </Button>
        </form>
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
          ARCHIVES<Typography> </Typography>
        </Typography>
        <Grid>
          <List dense={dense}>
            {!archives ? (
              <Grid>No archives</Grid>
            ) : (
              archives.map((archiveObj, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <ArrowForwardIosIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {JSON.stringify(
                        new Date(archiveObj.createdAt.seconds * 1000)
                      ).slice(1, 11)}
                      :{"         "}
                      <Link
                        href={`${archiveObj.archive}`}
                      >{`${archiveObj.archive}`}</Link>
                    </ListItemText>
                  </ListItem>
                );
              })
            )}
          </List>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="#474747"
            onClick={() => randomQ(archives)}
            disableRipple="true"
          >
            ? Random Question ?
          </Button>
          <Grid>
            <Link href={`${random}`}>
              <Typography>{random}</Typography>
            </Link>
          </Grid>
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
