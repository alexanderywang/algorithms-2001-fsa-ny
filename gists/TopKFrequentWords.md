[leetcode: Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/).

## Top K Frequent Words

Given a non-empty list of words, return the k most frequent elements.

Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.

#### Example 1

<a><code>
Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2 <hr/>
Output: ["i", "love"] <hr/>
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.
</code></a>

#### Example 2

<a><code> Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4. <hr/>
Output: ["the", "is", "sunny", "day"]. <hr/>
Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
with the number of occurrence being 4, 3, 2 and 1 respectively.
</code></a>

#### Note

1. You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
2. Input words contain only lowercase letters.

#### Follow up

Try to solve it in O(n log k) time and O(n) extra space.

## Solution

#### Approach #1: Sorting

Intuition and Algorithm

Count the frequency of each word, and sort the words with a custom ordering relation that uses these frequencies. Then take the best k of them.

My solution:
<a><code>

var topKFrequent = function(words, k) {
let freqHash = {}

    for (let i = 0, len = words.length; i < len; i++) {
        let word = words[i]
        if (freqHash[word]) freqHash[word]++
        else freqHash[word] = 1
    }

    let results = Object.keys(freqHash).sort((a, b) => {
        if (freqHash[a] === freqHash[b]) return (a>b) ? 1 : -1
        else return freqHash[b] - freqHash[a]
    })

    return results.slice(0,k)

}

</code></a>

#### Complexity Analysis

- Time Complexity: O(N \log{N})O(NlogN), where NN is the length of <code>words</code>. We count the frequency of each word in O(N)O(N) time, then we sort the given words in O(N \log{N})O(NlogN) time.

- Space Complexity: O(N)O(N), the space used to store our candidates.

#### Approach #2: Heap

Intuition and Algorithm

Count the frequency of each word, then add it to heap that stores the best k candidates. Here, "best" is defined with our custom ordering relation, which puts the worst candidates at the top of the heap. At the end, we pop off the heap up to k times and reverse the result so that the best candidates are first.

#### Complexity Analysis

- Time Complexity: O(N \log{k})O(Nlogk), where NN is the length of words. We count the frequency of each word in O(N)O(N) time, then we add NN words to the heap, each in O(\log {k})O(logk) time. Finally, we pop from the heap up to kk times. As k \leq Nk≤N, this is O(N \log{k})O(Nlogk) in total.

- Space Complexity: O(N)O(N), the space used to store our count.

#### My solution:

```
var topKFrequent = function(words, k) {
    let freqHash = {}

    for (let i = 0, len = words.length; i < len; i++) {
        let word = words[i]
        if (freqHash[word]) freqHash[word]++
        else freqHash[word] = 1
    }
    // console.log("hash: ",freqHash)

    let results = Object.keys(freqHash).sort((a, b) => {
        if (freqHash[a] === freqHash[b]) return (a>b) ? 1 : -1
        // if (freqHash[a] === freqHash[b]) {
        //   if (a>b) return 1
        //   else return -1
        // }
        else return freqHash[b] - freqHash[a]
    })
    // console.log("results:" ,results)
    return results.slice(0,k)
};
```
