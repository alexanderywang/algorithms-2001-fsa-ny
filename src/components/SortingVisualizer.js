import React from 'react';
import {
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  Cell,
} from 'recharts';
import Button from '@material-ui/core/Button';

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
class SortingVisualizer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
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
      ],
    };
    this.changedata = this.changedata.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.genernrateRandomArray = this.genernrateRandomArray.bind(this);
  }
  genernrateRandomArray() {
    let array = [];
    let size = Math.floor(Math.random() * 101) + 4;
    console.log(size);
    for (let i = 0; i < size; ++i) {
      let randomNum = Math.floor(Math.random() * 1000) + 10;
      array[i] = {
        name: '' + randomNum,
        value: randomNum,
      };
    }
    this.setState({
      data: array,
    });
  }
  async bubbleSort(array) {
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

        await sleep(10);
        array[j + 1].compare = false;
      }
      array[i].compare = false;
      array[i].done = '#00C49F';
    }
    this.setState({ data: Array.from(array) });
  }
  dataChanged(data) {
    this.setState({
      data: data,
    });
    console.log('the state', this.state.data);
  }
  changedata(e) {
    e.preventDefault();
    let array = this.state.data;
    this.bubbleSort(array);
    // this.dataChanged(array);
    console.log('click!');
  }
  render() {
    const colors = ['#0088FE', '#FF0000', '#FFBB28', '#FF8042'];
    return (
      <div>
        <h1>Bubble Sort</h1>
        <BarChart width={730} height={250} data={this.state.data}>
          <XAxis dataKey='name' />

          <Bar dataKey='value'>
            {this.state.data.map((entry, index) => {
              const color = entry.compare ? colors[0] : colors[1];
              return (
                <Cell key={index} fill={entry.done ? entry.done : color} />
              );
            })}
          </Bar>
        </BarChart>
        <Button onClick={(e) => this.changedata(e)}>Start</Button>
        <Button onClick={() => this.genernrateRandomArray()}>
          Random Array
        </Button>
      </div>
    );
  }
}

export default SortingVisualizer;
