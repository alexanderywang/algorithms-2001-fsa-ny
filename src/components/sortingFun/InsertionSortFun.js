const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};

export const InsertionSort = async (array, callback) => {
  for (let i = 1; i < array.length; ++i) {
    let j = i;

    while (j > 0 && array[j].value < array[j - 1].value) {
      array[j].color = '#9400D3';

      callback(array);
      let temp = array[j - 1].value;
      array[j - 1].value = array[j].value;
      array[j - 1].name = '' + array[j].value;
      array[j].value = temp;
      array[j].name = '' + temp;
      array[j].compare = false;

      await sleep(0);
      array[j].color = '#00C49F';
      array[j - 1].color = '#00C49F';
      callback(array);

      j -= 1;
    }
    // array[i].color = '#00C49F';
    callback(array);
  }

  callback(array);
};
