const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};

export const SelectionSort = async (array, callback) => {
  for (let i = 0; i < array.length - 1; i++) {
    let min = i;
    array[min].color = '#9400D3';
    callback(array);
    await sleep(0);
    for (let j = i + 1; j < array.length; j++) {
      if (array[j].value < array[min].value) {
        array[min].color = 'red';
        min = j;
        array[min].color = '#9400D3';
        callback(array);
        await sleep(0);
      }
    }
    if (min !== i) {
      //before swap
      array[min].color = '#00C49F';

      callback(array);
      await sleep(0);

      let temp = array[min];
      array[min] = array[i];
      array[i] = temp;
      //after swap
      array[min].color = 'red';

      callback(array);
      await sleep(0);
    } else {
      array[min].color = '#00C49F';
      callback(array);
      await sleep(0);
    }
  }
  array[array.length - 1].color = '#00C49F';
  callback(array);
  await sleep(0);
  callback(array);
};
