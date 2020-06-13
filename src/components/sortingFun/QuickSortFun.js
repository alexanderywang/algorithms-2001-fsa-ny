const sleep = (milliseconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, milliseconds);
    });
  };
  
export const QuickSort = async (items,left, right, callback) => {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right,callback); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            QuickSort(items, left, index - 1,callback);
        }
        if (index < right) { //more elements on the right side of the pivot
            QuickSort(items, index, right,callback);
        }
    }
    return items;
  };

function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[leftIndex].color='#00C49F'
    items[rightIndex] = temp;
    items[rightIndex].color='#00C49F'
}
function partition(items, left, right,callback) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
        items[Math.floor((right + left) / 2)].color='#9400D3'
    while (i <= j) {
        while (items[i].value < pivot.value) {
            i++;
        }
        while (items[j].value > pivot.value) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j,callback); //sawpping two elements
            i++;
            j--;
        }
    }
    callback(items)
    return i;
}

