const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};

export const BubbleSort = async (array, callback) => {
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
      callback(array);

      await sleep(0);

      array[j + 1].compare = false;
    }
    array[i].compare = false;
    array[i].done = '#00C49F';
  }
  callback(array);
};
