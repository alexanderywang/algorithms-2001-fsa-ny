import { sleep } from './ult.js';
// export function MergeSortFun(array, callback) {
//   if (array == null) {
//     return;
//   }

//   if (array.length > 1) {
//     let mid = Math.floor(array.length / 2);

//     // Split left part

//     let left = new Array(mid);

//     for (let i = 0; i < mid; i++) {
//       left[i] = array[i];
//     }

//     // Split right part
//     let right = new Array(array.length - mid);
//     for (let i = mid; i < array.length; i++) {
//       right[i - mid] = array[i];
//     }

//     MergeSortFun(left);
//     MergeSortFun(right);

//     let i = 0;
//     let j = 0;
//     let k = 0;

//     // Merge left and right arrays
//     while (i < left.length && j < right.length) {
//       if (left[i] < right[j]) {
//         array[k] = left[i];
//         i++;
//       } else {
//         array[k] = right[j];
//         j++;
//       }
//       k++;
//     }
//     // Collect remaining elements
//     while (i < left.length) {
//       array[k] = left[i];
//       i++;
//       k++;
//     }
//     while (j < right.length) {
//       array[k] = right[j];
//       j++;
//       k++;
//     }
//   }
//   console.log(array);
//   return array;
// }
export const MergeSortFun = async (array, callback) => {
  if (array.length === 1 || array.length === 0) return array;

  // split the array in half
  const [left, right] = split(array);

  // sort left half
  const leftSortedHalf = MergeSortFun(left, callback);

  // sort right half
  const rightSortedHalf = MergeSortFun(right, callback);
  callback([...leftSortedHalf, ...rightSortedHalf]);
  await sleep(0);
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
      sortedArray[sortedArrayIndex] = leftUnsortedArray[leftIndex];
      sortedArray[sortedArrayIndex].color = '#00C49F';
      leftIndex++;
    } else {
      // if first element of right array is smaller then the first element of the
      //  left array, then copy that element to the sorted array
      sortedArray[sortedArrayIndex] = rightUnsortedArray[rightIndex];
      sortedArray[sortedArrayIndex].color = '#00C49F';
      rightIndex++;
    }

    sortedArrayIndex++;
  }

  // loop thru the remaining elements (there should be only 1 left)
  //  and copy that last element into the sorted array
  for (let i = leftIndex; i < leftUnsortedArray.length; i++) {
    sortedArray[sortedArrayIndex] = leftUnsortedArray[i];
    sortedArray[sortedArrayIndex].color = '#00C49F';
    sortedArrayIndex++;
  }

  for (let i = rightIndex; i < rightUnsortedArray.length; i++) {
    sortedArray[sortedArrayIndex] = rightUnsortedArray[i];
    sortedArray[sortedArrayIndex].color = '#00C49F';
    sortedArrayIndex++;
  }
  // console.log('merge', sortedArray);
  callback(sortedArray);
  // await sleep(0);
  return sortedArray;
}
