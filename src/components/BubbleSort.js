import React, { useState, useEffect } from 'react';
import { BarChart, CartesianGrid, Bar, XAxis, Cell } from 'recharts';
import Button from '@material-ui/core/Button';
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const BubbleSort = ({ data, sortStart }) => {
  console.log('sort start', sortStart);
  const [bubbleData, setBubbleData] = useState([]);
  // const [sortStart, setSortStart] = useState(sortStart);

  useEffect(() => {
    setBubbleData(data);
  }, [data]);

  // useEffect(() => {
  //   if(sortStart){
  //     bubbleSort(bubbleData)
  //   }
  // }, [sortStart]);

  const bubbleSort = async (array) => {
    for (let i = 0; i < array.length; ++i) {
      array[i].compare = true;
      for (let j = i; j < array.length - 1; ++j) {
        array[j + 1].compare = true;
        if (array[i].value > array[j + 1].value) {
          let temp = array[i].value;
          array[i].value = array[j + 1].value;
          array[i].name = '' + array[j + 1].value;
          array[j + 1].value = temp;
          array[j + 1].name = '' + temp;
        }
        setBubbleData(Array.from(array));

        await sleep(50);

        array[j + 1].compare = false;
      }
      array[i].compare = false;
      array[i].done = '#00C49F';
    }
    setBubbleData(Array.from(array));
  };

  const colors = ['#0088FE', '#FF0000', '#FFBB28', '#FF8042'];

  // if (sortStart === true) {
  //   sortStart = false;
  //   bubbleSort(bubbleData);

  //   console.log('in the if ', sortStart);
  // }
  return (
    <div>
      <BarChart width={730} height={250} data={bubbleData}>
        <XAxis dataKey='name' />
        <Bar dataKey='value'>
          {bubbleData.map((entry, index) => {
            const color = entry.compare ? '#0088FE' : '#FF0000';
            return <Cell key={index} fill={entry.done ? entry.done : color} />;
          })}
        </Bar>{' '}
      </BarChart>
      <Button onClick={(e) => bubbleSort(bubbleData)}>Start</Button>
    </div>
  );
};
// const mapstate = (state) => {
//   return {
//     data: [...state.data],
//   };
// };
export default BubbleSort;
