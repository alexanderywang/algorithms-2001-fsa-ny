import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Tooltip,
  IconButton,
  Switch,
  Link,
  FormControlLabel,
  Paper,
  Typography,
  TableSortLabel,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import { db } from "../config/firebase";
import firebase from "firebase";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import StarIcon from "@material-ui/icons/Star";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: "Date",
    label: "Date",
    columnAlignment: true,
    disablePadding: false,
    label: "Date"
  },
  {
    id: "link",
    label: "Link",
    columnAlignment: true,
    disablePadding: false,
    format: value => value.toLocaleString()
  },
  {
    id: "solution",
    label: "Solution Link",
    columnAlignment: true,
    disablePadding: false
    // format: value => value.toLocaleString()
  }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.columnAlignment ? "left" : "right"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  paper: {
    width: "100%",
    padding: "1em"
  }
}));

export default function ArchiveTable() {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [random, setRandom] = useState("");
  const [archives, setArchives] = useState([]);

  const [archive, setArchive] = useState("");
  const [solution, setSolution] = useState("");

  useEffect(() => {
    const arch = [];
    const response = async () => {
      await db
        .collection("Archives")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            arch.push({ ...doc.data(), archiveId: doc.id });
            setArchives([...arch]);
          });
        })
        .catch(err => {
          console.error(err);
        });
    };
    response();
  }, []);

  const rows = archives.map(archive => ({
    createdAt: JSON.stringify(new Date(archive.createdAt.seconds * 1000)).slice(
      1,
      11
    ),
    archive: archive.archive,
    solution: archive.solution,
    archiveId: archive.archiveId
  }));
  const handleSubmit = async e => {
    e.preventDefault();

    await db
      .collection("Archives")
      .add({ archive, solution, createdAt: new Date() })
      .then(response => {
        setArchives(prevArchives => [
          ...prevArchives,
          {
            archive,
            solution,
            createdAt: { seconds: new Date().getTime() / 1000 }
          }
        ]);
      })
      .catch(function(error) {
        console.error(error);
      });
    setArchive("");
    setSolution("");
  };

  const randomQ = array => {
    return setRandom(array[Math.floor(Math.random() * array.length)].archive);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 50));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  // const handleFav = async (table, themeId) => {
  //   if (table === "S") {
  //     await db
  //       .collection("Users")
  //       .doc(`${signedInUserId}`)
  //       .update({
  //         starred: firebase.firestore.FieldValue.arrayRemove(`${themeId}`)
  //       })
  //       .then(() => {
  //         setStarredThemes(prevStarredThemes =>
  //           prevStarredThemes.filter(theme => theme.themeId !== themeId)
  //         );
  //       });
  //     await db
  //       .collection("CustomizedThemes")
  //       .doc(`${themeId}`)
  //       .update({
  //         starsCount: firebase.firestore.FieldValue.increment(-1)
  //       })
  //       .then(() => {
  //         // console.log("decrement starsCount");
  //       });
  //   } else if (table === "B") {
  //     await db
  //       .collection("Users")
  //       .doc(`${signedInUserId}`)
  //       .update({
  //         bookmarked: firebase.firestore.FieldValue.arrayRemove(`${themeId}`)
  //       })
  //       .then(() => {
  //         setBookmarkedThemes(prevBookmarkedThemes =>
  //           prevBookmarkedThemes.filter(theme => theme.themeId !== themeId)
  //         );
  //       });
  //     await db
  //       .collection("CustomizedThemes")
  //       .doc(`${themeId}`)
  //       .update({
  //         bookmarksCount: firebase.firestore.FieldValue.increment(-1)
  //       })
  //       .then(() => {
  //         // console.log("decrement bookmarkscount");
  //       });
  //   }
  // };
  const handleDelete = async archiveId => {
    // delete archive
    await db
      .collection("Archives")
      .doc(`${archiveId}`)
      .delete()
      .then(response => {
        setArchives(prevArchives =>
          prevArchives.filter(archive => archive.archiveId !== archiveId)
        );
      })
      .catch(function(error) {
        console.error(error);
      });
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
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
          <Grid item xs={6} sm={6}>
            <TextField
              label="Add Solution URL"
              variant="outlined"
              type="text"
              value={solution}
              onChange={e => setSolution(e.target.value)}
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
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Archives
        </Typography>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              style={{ align: "right" }}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.createdAt}
                      </TableCell>
                      <Link target="_blank" href={`${row.archive}`}>
                        <TableCell align="left">{row.archive}</TableCell>
                      </Link>
                      <TableCell>
                        <Tooltip title="solution link">
                          <IconButton
                            aria-label="solution link"
                            component={Link}
                            href={`${row.solution}`}
                            target="_blank"
                          >
                            <LibraryAddCheckIcon color="#474747" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      {/* Admin Only */}
                      {/* <TableCell>
                      <Tooltip title="Delete Theme">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(row.archiveId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
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
    </div>
  );
}
