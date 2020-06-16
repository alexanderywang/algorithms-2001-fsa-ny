[leetcode: 350. Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/).

Given two arrays, write a function to compute their intersection.

#### Example 1:
```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
```
#### Example 2:
```
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
```
#### Notes
* Each element in the result should appear as many times as it shows in both arrays.
* The result can be in any order.
#### Hints
* Think about time and space complexity
* Find a solution that has constant time search, delete, insert

#### Follow up:
* What if the given array is already sorted? How would you optimize your algorithm?
* What if nums1's size is small compared to nums2's size? Which algorithm is better?
* What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?
## Solution

If an interviewer gives you this problem, your first question should be - how should I handle duplicates? Your second question, perhaps, can be about the order of inputs and outputs. Such questions manifest your problem-solving skills, and help you steer to the right solution.

The solution for the previous problem, 349. Intersection of Two Arrays, talks about approaches when each number in the output must be unique. For this problem, we need to adapt those approaches so that numbers in the result appear as many times as they do in both arrays.

#### Approach #1:  Hash Map

<strong>Algorithm</strong>

For the previous problem, we used a hash set to achieve a linear time complexity. Here, we need to use a hash map to track the count for each number.

We collect numbers and their counts from one of the arrays into a hash map. Then, we iterate along the second array, and check if the number exists in the hash map and its count is positive. If so - add the number to the result and decrease its count in the hash map.

![hashmap](https://leetcode.com/problems/intersection-of-two-arrays-ii/Figures/350/350_approach1-v2.png)
It's a good idea to check array sizes and use a hash map for the smaller array. It will reduce memory usage when one of the arrays is very large.

If nums1 is larger than nums2, swap the arrays.

For each element in nums1:

Add it to the hash map m.

Increment the count if the element is already there.
Initialize the insertion pointer (k) with zero.

Iterate along nums2:

If the current number is in the hash map and count is positive:

Copy the number into nums1[k], and increment k.

Decrement the count in the hash map.

Return first k elements of nums1.


#### Complexity Analysis

* Time complexity: O(n+m), where n and m are the lengths of the arrays. We iterate through the first, and then through the second array; insert and lookup operations in the hash map take a constant time.

Space complexity: O(min(n,m)). We use hash map to store numbers (and their counts) from the smaller array.

**************

#### My solution with hash as a javascript object:
```
var intersect = function(nums1, nums2) {
    let result = []
    let hash = {}
    let longer, shorter
    if (nums1.length <= nums2.length) {
        shorter = nums1
        longer = nums2
    } else {
        shorter = nums2
        longer = nums1
    }
    // shorter means less O(n) space
    for (let i = 0; i < shorter.length; i++){
        if (hash.hasOwnProperty(shorter[i])) {
            hash[shorter[i]]++
        } else {
            hash[shorter[i]] = 1
        }
    }
    for (let i = 0; i < longer.length; i++) {
        if (hash.hasOwnProperty(longer[i])) {
            result.push(longer[i])
            hash[longer[i]]--
            if (hash[longer[i]] === 0) {
                delete hash[longer[i]]
            }
        }
    }

    return result
};
```

#### Follow-up Questions
What if the given array is already sorted? How would you optimize your algorithm?

* We can use either Approach 2 or Approach 3, dropping the sort of course. It will give us linear time and constant memory complexity.
* What if nums1's size is small compared to nums2's size? Which algorithm is better?

* Approach 1 is a good choice here as we use a hash map for the smaller array.
* What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

* If nums1 fits into the memory, we can use Approach 1 to collect counts for nums1 into a hash map. Then, we can sequentially load and process nums2.

* If neither of the arrays fit into the memory, we can apply some partial processing strategies:

* Split the numeric range into subranges that fits into the memory. Modify Approach 1 to collect counts only within a given subrange, and call the method multiple times (for each subrange).

* Use an external sort for both arrays. Modify Approach 2 to load and process arrays sequentially.
