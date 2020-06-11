import { sleep } from './ult.js';
export const MergeSortFun = (array, callback) => {
  if (array.length === 1 || array.length === 0) return array;

  // split the array in half
  const [left, right] = split(array);

  // sort left half
  const leftSortedHalf = MergeSortFun(left, callback);

  // sort right half
  const rightSortedHalf = MergeSortFun(right, callback);
  // merge the left and right arrays together
  return merge(leftSortedHalf, rightSortedHalf, callback);
};

function split(array) {
  const midPoint = Math.floor(array.length / 2);

  // create two arrays based on the mid point of the original array
  const leftHalf = array.slice(0, midPoint);
  const rightHalf = array.slice(midPoint);

  // return an array of two arrays
  //   where each array holds one half of the original array
  return [leftHalf, rightHalf];
}

function merge(leftUnsortedArray, rightUnsortedArray, callback) {
  // set some base indices as the starting point for looping through
  //  the left and right unsorted arrays
  let leftIndex = 0,
    rightIndex = 0,
    sortedArrayIndex = 0;

  // create an empty array with a total size of both left and right unsorted arrays combined
  const sortedArray = new Array(
    leftUnsortedArray.length + rightUnsortedArray.length
  );

  // loop only while both the left and right indices
  //  have not exceeded the bounds of the their unsorted array counterparts
  while (
    leftIndex < leftUnsortedArray.length &&
    rightIndex < rightUnsortedArray.length
  ) {
    // if first element of left array is smaller then the first element of the
    //  right array, then copy that element to the sorted array
    if (
      leftUnsortedArray[leftIndex].value < rightUnsortedArray[rightIndex].value
    ) {
      sortedArray[sortedArrayIndex].value = leftUnsortedArray[leftIndex].value;
      leftIndex++;
    } else {
      // if first element of right array is smaller then the first element of the
      //  left array, then copy that element to the sorted array
      sortedArray[sortedArrayIndex].value =
        rightUnsortedArray[rightIndex].value;
      rightIndex++;
    }

    sortedArrayIndex++;
  }

  // loop thru the remaining elements (there should be only 1 left)
  //  and copy that last element into the sorted array
  for (let i = leftIndex; i < leftUnsortedArray.length; i++) {
    sortedArray[sortedArrayIndex].value = leftUnsortedArray[i].value;
    sortedArrayIndex++;
  }

  for (let i = rightIndex; i < rightUnsortedArray.length; i++) {
    sortedArray[sortedArrayIndex].value = rightUnsortedArray[i].value;
    sortedArrayIndex++;
  }
  callback(sortedArray);
  return sortedArray;
}
