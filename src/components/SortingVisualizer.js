import React, { useState, useEffect } from 'react';
import { BarChart, CartesianGrid, Bar, XAxis, Cell } from 'recharts';
import Button from '@material-ui/core/Button';
import {
  Slider,
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
  Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import layoutStypes from './sorting.module.scss';
// import BubbleSort from './BubbleSort';

import { BubbleSort } from './sortingFun/BubbleSortFun';
import { InsertionSort } from './sortingFun/InsertionSortFun';
import { MergeSortFun } from './sortingFun/MergeSortFun';
import { QuickSort } from './sortingFun/QuickSortFun';
const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));
const SortingVisualizer = () => {
  const [data, setData] = useState([
    {
      name: '500',
      value: 500,
    },
    {
      name: '300',
      value: 300,
    },
    {
      name: '50',
      value: 50,
    },
    {
      name: '1000',
      value: 1000,
    },
  ]);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const genernrateRandomArray = () => {
    let array = [];
    let size = Math.floor(Math.random() * 101) + 4;

    for (let i = 0; i < size; ++i) {
      let randomNum = Math.floor(Math.random() * 1000) + 10;
      array[i] = {
        name: '' + randomNum,
        value: randomNum,
      };
    }

    setData(array);
  };

  const dataChanged = (array) => {
    setData(Array.from(array));
  };

  const changedata = (e) => {
    // BubbleSort(this.state.data, this.dataChanged);
    // this.setState({
    //   sortStart: true,
    // });

    switch (value) {
      case 0:
        BubbleSort(data, dataChanged);
        break;
      case 1:
        InsertionSort(data, dataChanged);
        break;
      case 2:
        MergeSortFun(data, dataChanged);
        break;
      case 3:
        QuickSort(data,0,data.length-1, dataChanged);
        break;
      default:
        BubbleSort(data, dataChanged);
    }
    // InsertionSort(data, dataChanged);
  };

  const colors = ['#0088FE', '#FF0000', '#FFBB28', '#FF8042'];
  return (
    <div className={layoutStypes.container}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          <Tab label='BubbleSort' {...a11yProps(0)} />
          <Tab label='InsertionSort' {...a11yProps(1)} />
          <Tab label='Merge Sort' {...a11yProps(2)} />
          <Tab label='Quick SOrt' {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Bubble Sort
      </TabPanel>
      <TabPanel value={value} index={1}>
        Insertion Sort
      </TabPanel>
      <TabPanel value={value} index={2}>
        Merge Sort
      </TabPanel>
      <TabPanel value={value} index={3}>
        Quick Sort
      </TabPanel>

      <BarChart width={730} height={250} data={data}>
        <XAxis dataKey='name' />

        <Bar dataKey='value'>
          {data.map((entry, index) => {
            return (
              <Cell
                key={index}
                fill={
                  entry.done
                    ? entry.done
                    : entry.color
                    ? entry.color
                    : colors[1]
                }
              />
            );
          })}
        </Bar>
      </BarChart>
      <Box>
        <Button onClick={(e) => changedata(e)}>Start</Button>

        <Button onClick={() => genernrateRandomArray()}>Random Array</Button>
      </Box>
    </div>
  );
};

export default SortingVisualizer;
