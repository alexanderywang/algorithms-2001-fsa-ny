[leetcode: 159. Longest Substring with At Most Two Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/).

Given a string s , find the length of the longest substring t  that contains at most 2 distinct characters.


#### Example 1:
```
Input: "eceba"
Output: 3
Explanation: t is "ece" which its length is 3.
```
#### Example 2:
```
Input: "ccaabbb"
Output: 5
Explanation: t is "aabbb" which its length is 5.
```

## Solution
#### Approach 1: Sliding Window

To solve the problem in one pass let's use here sliding window approach with two set pointers left and right serving as the window boundaries.

The idea is to set both pointers in the position 0 and then move right pointer to the right while the window contains not more than two distinct characters. If at some point we've got 3 distinct characters, let's move left pointer to keep not more than 2 distinct characters in the window.

![sliding](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/Figures/159/sliding.png)

Basically that's the algorithm : to move sliding window along the string, to keep not more than 2 distinct characters in the window, and to update max substring length at each step.

There is just one more question to reply - how to move the left pointer to keep only 2 distinct characters in the string?

Let's use for this purpose hashmap containing all characters in the sliding window as keys and their rightmost positions as values. At each moment, this hashmap could contain not more than 3 elements.

![window](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/Figures/159/move_left.png)

For example, using this hashmap one knows that the rightmost position of character e in "eeeeeeeet" window is 8 and so one has to move left pointer in the position 8 + 1 = 9 to exclude the character e from the sliding window.

Do we have here the best possible time complexity? Yes, we do - it's the only one pass along the string with N characters and the time complexity is O(N).

<strong>Algorithm</strong>

Now one could write down the algortihm.

* Return N if the string length N is smaller than 3.
* Set both set pointers in the beginning of the string left = 0 and right = 0 and init max substring length max_len = 2.
* While right pointer is less than N:
    * If hashmap contains less than 3 distinct characters, add the current character s[right] in the hashmap and move right pointer to the right.
    * If hashmap contains 3 distinct characters, remove the leftmost character from the hashmap and move the left pointer so that sliding window contains again 2 distinct characters only.
    * Update longest substring


#### Complexity Analysis

* Time complexity : O(N) where N is a number of characters in the input string.

* Space complexity : O(1) since additional space is used only for a hashmap with at most 3 elements.

**************

#### My solution
```
// hash of characters in window {char:freq}
// while size > 2, move left pointer, decrement freq in hash, if freq = 0, delete char, move right
var lengthOfLongestSubstringTwoDistinct = function(s) {
    let freq = new Map()
    let left = 0
    let longest = 0
    for (let right = 0; right < s.length; right++){
        // set new Map(), .size is O(1) vs Object.keys().length which is O(n)
        if (!freq.has(s[right])){
            freq.set(s[right],1)
        } else {
            freq.set(s[right], freq.get(s[right]) + 1)
        }
        if (freq.size <= 2) {
            longest = Math.max(longest, right - left + 1)
        }
        while (freq.size > 2) {
            freq.set(s[left], freq.get(s[left]) - 1)
            if (freq.get(s[left]) === 0) {
                freq.delete(s[left])
            }
            left++
        }
    }
    return longest
};

```
#### Bonus Followup question

![340. Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)
