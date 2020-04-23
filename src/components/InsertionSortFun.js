const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};

export const InsertionSort = async (array, callback) => {
  for (let i = 1; i < array.length; ++i) {
    let j = i;

    while (j > 0 && array[j].value < array[j - 1].value) {
      array[j].compare = true;

      callback(array);
      let temp = array[j - 1].value;
      array[j - 1].value = array[j].value;
      array[j - 1].name = '' + array[j].value;
      array[j].value = temp;
      array[j].name = '' + temp;
      array[j].compare = false;

      await sleep(0);

      callback(array);

      j -= 1;
    }
    array[i].done = '#00C49F';
    callback(array);
  }
  console.log('insertion sort', array);
  callback(array);
};

// for (let i = 0; i < array.length; ++i) {
//     array[i].compare = true;
//     for (let j = i; j < array.length - 1; ++j) {
//       array[j + 1].compare = true;
//       if (array[i].value > array[j + 1].value) {
//         let temp = array[i].value;
//         array[i].value = array[j + 1].value;
//         array[i].name = '' + array[j + 1].value;
//         array[j + 1].value = temp;
//         array[j + 1].name = '' + temp;
//       }
//       callback(array);

//       await sleep(0);

//       array[j + 1].compare = false;
//     }
//     array[i].compare = false;
//     array[i].done = '#00C49F';
//   }
//   callback(array);
