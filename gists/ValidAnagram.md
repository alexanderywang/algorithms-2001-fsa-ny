[leetcode: 242. Valid Anagram](https://leetcode.com/problems/valid-anagram/).

Given two strings s and t , write a function to determine if t is an anagram of s.


#### Example 1:
```
Input: s = "anagram", t = "nagaram"
Output: true
```
#### Example 2:
```
Input: s = "rat", t = "car"
Output: false
```
#### Notes
You may assume the string contains only lowercase alphabets.

#### Followup
What if the inputs contain unicode characters? How would you adapt your solution to such case?

#### Hints
* 2 possible solutions. one with sorting. one without

* Think about time and space complexity


## Solution

#### Approach #1: Sorting

<strong>Algorithm</strong>

An anagram is produced by rearranging the letters of ss into tt. Therefore, if tt is an anagram of ss, sorting both strings will result in two identical strings. Furthermore, if ss and tt have different lengths, tt must not be an anagram of ss and we can return early.

```
var isAnagram = function(s, t) {

    if (s.length !== t.length) return false
    let str1 = s.split('').sort().join('')
    let str2 = t.split('').sort().join('')
    return str1 === str2
};
```


#### Complexity Analysis

* Time complexity : O(n log n). Assume that n is the length of s, sorting costs O(n log n) and comparing two strings costs O(n). Sorting time dominates and the overall time complexity is O(n log n).

* Space complexity : O(1). Space depends on the sorting implementation which, usually, costs O(1) auxiliary space if heapsort is used. Note that in Java, toCharArray() makes a copy of the string so it costs O(n)O(n) extra space, but we ignore this for complexity analysis because:

It is a language dependent detail.
It depends on how the function is designed. For example, the function parameter types can be changed to char[].

#### Approach #2: Hash Table

<strong>Algorithm</strong>

To examine if tt is a rearrangement of ss, we can count occurrences of each letter in the two strings and compare them. Since both ss and tt contain only letters from a-za−z, a simple counter table of size 26 is suffice.

Do we need two counter tables for comparison? Actually no, because we could increment the counter for each letter in ss and decrement the counter for each letter in tt, then check if the counter reaches back to zero.

#### Complexity Analysis

* Time complexity : O(n). Time complexity is O(n) because accessing the counter table is a constant time operation.

* Space complexity : O(1). Although we do use extra space, the space complexity is O(1) because the table's size stays constant no matter how large n is.

**************

My Hash solution (refactored from 2 hash tables and 2 for loops):
```
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false
    let table = {}

    // strings the same length, so only need 1 loop and 1 hash table
    for (let i = 0; i < s.length; i++){
        if (table[s[i]]) table[s[i]]++
        else table[s[i]] = 1

        if (table[t[i]]) table[t[i]]--
        else table[t[i]] = -1
    }
    for (letter in table) {
        if (table[letter] !== 0) return false
    }
    return true
};
```
