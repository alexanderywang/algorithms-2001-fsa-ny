[leetcode: 56. Merge Intervals](https://leetcode.com/problems/merge-intervals/).

## Merge Interval
Given a collection of intervals, merge all overlapping intervals.

#### Example 1:
```
Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
```
#### Example 2:
```
Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

#### Hints
* It's not guaranteed to be sorted

* 2 conditions - check the current interval and the next interval. If next interval beginning is less than or equal to current interval's end, then you found an overlap and merge them.

* To test conditions, you need to sort

## Solution

#### Approach #1: Connected Components

<strong>Intuition</strong>

If we draw a graph (with intervals as nodes) that contains undirected edges between all pairs of intervals that overlap, then all intervals in each connected component of the graph can be merged into a single interval.

<strong>Algorithm</strong>

With the above intuition in mind, we can represent the graph as an adjacency list, inserting directed edges in both directions to simulate undirected edges. Then, to determine which connected component each node is it, we perform graph traversals from arbitrary unvisited nodes until all nodes have been visited. To do this efficiently, we store visited nodes in a Set, allowing for constant time containment checks and insertion. Finally, we consider each connected component, merging all of its intervals by constructing a new Interval with start equal to the minimum start among them and end equal to the maximum end.

This algorithm is correct simply because it is basically the brute force solution. We compare every interval to every other interval, so we know exactly which intervals overlap. The reason for the connected component search is that two intervals may not directly overlap, but might overlap indirectly via a third interval. See the example below to see this more clearly.

![brute](https://leetcode.com/problems/merge-intervals/Figures/56/component.png)

Components Example

Although (1, 5) and (6, 10) do not directly overlap, either would overlap with the other if first merged with (4, 7). There are two connected components, so if we merge their nodes, we expect to get the following two merged intervals:

(1, 10), (15, 20)

#### Complexity Analysis

* Time complexity : O(n^2)

Building the graph costs O(V + E) = O(V) + O(E) = O(n) + O(n^2) = O(n^2)O(V+E)=O(V)+O(E)=O(n)+O(n^2)=O(n^2)
time, as in the worst case all intervals are mutually overlapping. Traversing the graph has the same cost (although it might appear higher at first) because our visited set guarantees that each node will be visited exactly once. Finally, because each node is part of exactly one component, the merge step costs O(V) = O(n)O(V)=O(n) time. This all adds up as follows:

O(n^2) + O(n^2) + O(n) = O(n^2)O(n^2)+O(n^2)+O(n)=O(n^2)

* Space complexity : O(n^2)

As previously mentioned, in the worst case, all intervals are mutually overlapping, so there will be an edge for every pair of intervals. Therefore, the memory footprint is quadratic in the input size.

#### Approach #2: Sorting

<strong>Intuition</strong>

If we sort the intervals by their start value, then each set of intervals that can be merged will appear as a contiguous "run" in the sorted list.

<strong>Algorithm</strong>

First, we sort the list as described. Then, we insert the first interval into our merged list and continue considering each interval in turn as follows: If the current interval begins after the previous interval ends, then they do not overlap and we can append the current interval to merged. Otherwise, they do overlap, and we merge them by updating the end of the previous interval if it is less than the end of the current interval.

A simple proof by contradiction shows that this algorithm always produces the correct answer. First, suppose that the algorithm at some point fails to merge two intervals that should be merged. This would imply that there exists some triple of indices ii, jj, and kk in a list of intervals \text{ints}ints such that i < j < ki<j<k and (\text{ints[i]}ints[i], \text{ints[k]}ints[k]) can be merged, but neither (\text{ints[i]}ints[i], \text{ints[j]}ints[j]) nor (\text{ints[j]}ints[j], \text{ints[k]}ints[k]) can be merged. From this scenario follow several inequalities:

\begin{aligned} \text{ints[i].end} < \text{ints[j].start} \\ \text{ints[j].end} < \text{ints[k].start} \\ \text{ints[i].end} \geq \text{ints[k].start} \\ \end{aligned}
ints[i].end<ints[j].start
ints[j].end<ints[k].start
ints[i].end≥ints[k].start
​


We can chain these inequalities (along with the following inequality, implied by the well-formedness of the intervals: \text{ints[j].start} \leq \text{ints[j].end}ints[j].start≤ints[j].end) to demonstrate a contradiction:

\begin{aligned} \text{ints[i].end} < \text{ints[j].start} \leq \text{ints[j].end} < \text{ints[k].start} \\ \text{ints[i].end} \geq \text{ints[k].start} \end{aligned}
ints[i].end<ints[j].start≤ints[j].end<ints[k].start
ints[i].end≥ints[k].start
​


Therefore, all mergeable intervals must occur in a contiguous run of the sorted list.

![list](https://leetcode.com/problems/merge-intervals/Figures/56/sort.png)

Sorting Example

Consider the example above, where the intervals are sorted, and then all mergeable intervals form contiguous blocks.



#### Complexity Analysis

* Time complexity : O(n log n)

Other than the sort invocation, we do a simple linear scan of the list, so the runtime is dominated by the O(n log n) complexity of sorting.

* Space complexity : O(1) or O(n)

If we can sort intervals in place, we do not need more than constant additional space. Otherwise, we must allocate linear space to store a copy of intervals and sort that.

**************

My solution 1:
```
var merge = function(intervals) {

    if (intervals.length <= 1) {
        return intervals
    }

    intervals.sort((a, b) => a[0]-b[0])
    let merged = []
    for (interval of intervals){
        // if nothing in merged or no overlap between last merged and current interval[0]
        if (!merged.length || merged[merged.length-1][1] < interval[0]) {
            merged.push(interval)
        }
        // else there's overlap, merge last and current
        else {
            merged[merged.length-1][1] = Math.max( merged[merged.length-1][1],interval[1])
        }
     }
     return merged
}
```
