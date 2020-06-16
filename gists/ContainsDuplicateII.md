[leetcode: 219. Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/).

Given an array of integers and an integer k, find out whether there are two distinct indices i and j in the array such that nums[i] = nums[j] and the absolute difference between i and j is at most k.

#### Example 1:
```
Input: nums = [1,2,3,1], k = 3
Output: true
```
#### Example 2:
```
Input: nums = [1,0,1,1], k = 1
Output: true
```
#### Example 3:
```
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
```
#### Hints
* Think about time and space complexity
* Find a solution that has constant time search, delete, insert

#### Follow up:
* Look at new Set() and new Map() methods
## Solution

#### Approach #1: Naive Linear Search

<strong>Algorithm</strong>

his algorithm is the same as Approach #1 in Contains Duplicate solution, except that it looks at previous kk elements instead of all its previous elements.

Another perspective of this algorithm is to keep a virtual sliding window of the previous kk elements. We scan for the duplicate in this window.

```
public boolean containsNearbyDuplicate(int[] nums, int k) {
    for (int i = 0; i < nums.length; ++i) {
        for (int j = Math.max(i - k, 0); j < i; ++j) {
            if (nums[i] == nums[j]) return true;
        }
    }
    return false;
}
// Time Limit Exceeded.
```

#### Complexity Analysis

* Time complexity : O(min(k,n)). It costs O(min(k,n)) time for each linear search. Apparently we do at most n comparisons in one search even if k can be larger than n.

Space complexity : O(1).

#### Approach #2: Hash Table

<strong>Intuition</strong>

Keep a sliding window of k elements using Hash Table.

<strong>Algorithm</strong>

From the previous approaches, we know that even logarithmic performance in search is not enough. In this case, we need a data structure supporting constant time search, delete and insert operations. Hash Table is the answer.

* Loop through the array, for each element do
  *  Search current element in the HashTable, return true if found
  *  Put current element in the HashTable
  *  If the size of the HashTable is larger than k, remove the oldest item.

* Return false

#### Complexity Analysis

* Time complexity : O(n). We do n operations of search, delete and insert, each with constant time complexity.

Space complexity : O(min(n,k)). The extra space required depends on the number of items stored in the hash table, which is the size of the sliding window, min(n,k).

**************

#### My solution with hash as a javascript object:
```
var containsNearbyDuplicate = function(nums, k) {
    let hash = {}
    for (let i = 0; i < nums.length; i++) {
        if (!hash.hasOwnProperty(nums[i])) {
            hash[nums[i]] = i
        }
        else {
            let diff = Math.abs(i - hash[nums[i]])
            if (diff <= k) return true
            else hash[nums[i]] = i
        }
    }
    return false
};
```
#### My Set solution:
```
var containsNearbyDuplicate = function(nums, k) {
  let set = new Set()
    for (let i = 0; i < nums.length; i++){
        if (set.has(nums[i])) return true
        set.add(nums[i])
        if (set.size > k) {
            set.delete(nums[i-k])
        }
    }
  return false
 }
 ```

 #### Additional reading
 ![set and map](https://javascript.info/map-set)
