import React from 'react';
import { BarChart, CartesianGrid, Bar, XAxis, Cell } from 'recharts';
import { connect } from 'react-redux';

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const BubbleSort = (props) => {
  // constructor({ data }) {
  //   super();
  //   this.state = {
  //     data: data,
  //   };
  //   this.bubbleSort = this.bubbleSort.bind(this);
  // }
  // componentDidMount() {
  //   this.setState({
  //     data: this.props.data,
  //   });
  // }

  // componentDidMount() {
  //   this.setState({
  //     data: this.props.data,
  //   });
  // }

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
        this.setState({ data: Array.from(array) });

        await sleep(1000 - this.state.speed);

        array[j + 1].compare = false;
      }
      array[i].compare = false;
      array[i].done = '#00C49F';
    }
    this.setState({ data: Array.from(array) });
  };

  const colors = ['#0088FE', '#FF0000', '#FFBB28', '#FF8042'];
  console.log('this.props.data', this.props.data);
  return (
    <BarChart width={730} height={250} data={this.state.data}>
      <XAxis dataKey='name' />

      <Bar dataKey='value'>
        {this.state.data.map((entry, index) => {
          const color = entry.compare ? '#0088FE' : '#FF0000';
          return <Cell key={index} fill={entry.done ? entry.done : color} />;
        })}
      </Bar>
    </BarChart>
  );
};
// const mapstate = (state) => {
//   return {
//     data: [...state.data],
//   };
// };
export default BubbleSort;
