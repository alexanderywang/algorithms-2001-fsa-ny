[leetcode: 451. Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/).

Given a string, sort it in decreasing order based on the frequency of characters.

#### Example 1:
```
Input:
"tree"

Output:
"eert"

Explanation:
'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
```
#### Example 2:
```
Input:
"cccaaa"

Output:
"cccaaa"

Explanation:
Both 'c' and 'a' appear three times, so "aaaccc" is also a valid answer.
Note that "cacaca" is incorrect, as the same characters must be together.
```
#### Example 3:
```
Input:
"Aabb"

Output:
"bbAa"

Explanation:
"bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.
```

#### Notes
Remember, Strings are Immutable!
Could be uppercase and lowercase, A is different than a

#### Hints and Keys

* Think about time and space complexity

## Solution

#### Approach #1: Arrays and Sorting

In order to sort the characters by frequency, we firstly need to know how many of each there are. One way to do this is to sort the characters by their numbers so that identical characters are side-by-side (all characters in a programming language are identified by a unique number). Then, knowing how many times each appears will be a lot easier.

Because Strings are immutable though, we cannot sort the String directly. Therefore, we'll need to start by converting it from a String to an Array of characters.
![string](https://leetcode.com/problems/sort-characters-by-frequency/Figures/451/to_list.png)

Converting the string "welcometoleetcode" to a list.

Now that we have an Array, we can sort it, which will make all identical characters side-by-side.
![string1](https://leetcode.com/problems/sort-characters-by-frequency/Figures/451/sort_array.png)

The Array of characters sorted.

There are a few different ways we can go from here. One easy-to-understand way is to create a new Array of Strings. Each String in the list will consist of one of the unique characters from the sorted characters Array.
![string2](https://leetcode.com/problems/sort-characters-by-frequency/Figures/451/group_strings.png)

The characters grouped into strings of the same character.

The next step is to sort this Array of Strings by length. To do this, we'll need to implement a suitable Comparator. Recall that there is no requirement for characters of the same frequency to appear in a specific order.
![string3](https://leetcode.com/problems/sort-characters-by-frequency/Figures/451/length_sort.png)

The strings sorted by length.

Finally, we can convert this Array of Strings into a single String.
![string4](https://leetcode.com/problems/sort-characters-by-frequency/Figures/451/stringify.png)

#### Complexity Analysis

* Let n be the length of the input String.

* Time Complexity : O(n log n).

The first part of the algorithm, converting the String to a List of characters, has a cost of O(n), because we are adding n characters to the end of a List.

The second part of the algorithm, sorting the List of characters, has a cost of O(n log n).

The third part of the algorithm, grouping the characters into Strings of similar characters, has a cost of O(n) because each character is being converted into a String.

Finally, the fourth part of the algorithm, sorting the Strings by length, has a worst case cost of O(n), which occurs when all the characters in the input String are unique.

Because we drop constants and insignificant terms, we get O(n log n)+3⋅O(n)=O(n log n).

Be careful with your own implementation—if you didn't do the string building process in a sensible way, then your solution could potentially be O(n^2).

Space Complexity : O(n).

It is impossible to do better with the space complexity, because Strings are immutable. The List of characters, List of Strings, and the final output String, are all of length n, so we have a space complexity of O(n).

#### Approach #2: HashMap and Sort

Another approach is to use a HashMap to count how many times each character occurs in the String; the keys are characters and the values are frequencies.
![hash1](https://leetcode.com/problems/sort-characters-by-frequency/Figures/451/hashmap.png)

The HashMap created with the string.

Next, extract a copy of the keys from the HashMap and sort them by frequency using a Comparator that looks at the HashMap values to make its decisions.
![hash2](https://leetcode.com/problems/sort-characters-by-frequency/Figures/451/hashmap_sorted.png)

The HashMap created with the string.

Finally, initialise a new StringBuilder and then iterate over the list of sorted characters (sorted by frequency). Look up the values in the HashMap to know how many of each character to append to the StringBuilder.

<strong>Algorithm</strong>


#### Complexity Analysis

* Let n be the length of the input String and k be the number of unique characters in the String.

We know that k≤n, because there can't be more unique characters than there are characters in the String. We also know that k is somewhat bounded by the fact that there's only a finite number of characters in Unicode (or ASCII, which I suspect is all we need to worry about for this question).

There are two ways of approaching the complexity analysis for this question.

We can disregard k, and consider that in the worst case, k = n.
We can consider k, recognising that the number of unique characters is not infinite. This is more accurate for real world purposes.
I've provided analysis for both ways of approaching it. I choose not to bring it up for the previous approach, because it made no difference there.

* Time Complexity : O(n log n) OR O(n + k log k).

Putting the characters into the HashMap has a cost of O(n), because each of the n characters must be put in, and putting each in is an O(1) operation.

Sorting the HashMap keys has a cost of O(k log k), because there are k keys, and this is the standard cost for sorting. If only using n, then it's O(n log n). For the previous question, the sort was carried out on nn items, not k, so was possibly a lot worse.

Traversing over the sorted keys and building the String has a cost of O(n), as n characters must be inserted.

Therefore, if we're only considering n, then the final cost is O(n log n).

Considering k as well gives us O(n+k log k), because we don't know which is largest out of n and k log k. We do, however, know that in total this is less than or equal to O(n log n).

* Space Complexity : O(n).

The HashMap uses O(k) space.

However, the string at the end dominates the space complexity, pushing it up to O(n), as every character from the input String must go into it. Like was said above, it's impossible to do better with the space complexity here.

What's interesting here is that if we only considernn, the time complexity is the same as the previous approach. But by considering k, we can see that the difference is potentially substantial.
********
#### My hashmap solution:
```
var frequencySort = function(s) {
    let hash = {}
    let result = ''
    s= s.split('')
    for (let i = 0; i < s.length; i++) {
        hash[s[i]] = (hash[s[i]]) ? hash[s[i]]+1 : 1
    }
    Object.keys(hash).sort((a,b) => hash[b]-hash[a]).forEach(letter => {
            for (let i = 0; i < hash[letter]; i++) {
                        result += letter
            }
        })
    return result
}
```
