[leetcode: 70 Climbing Stairs](https://leetcode.com/problems/climbing-stairs/).

You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

#### Note: Given n will be a positive integer.

#### Example 1:
```
Input: 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```
#### Example 2:
```
Input: 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```
#### Hints
* To reach nth step, what could have been your previous steps? (Think about the step sizes)

## Solution
There are a lot of different ways to solve this in similar Time Complexity.  We'll focus on the dynamic programming solution though, because it is one of the easier dynamic programming setups to understand.

#### Approach #1: Dynamic Programming

<strong>Algorithm</strong>
As we can see this problem can be broken into subproblems, and it contains the optimal substructure property i.e. its optimal solution can be constructed efficiently from optimal solutions of its subproblems, we can use dynamic programming to solve this problem.

One can reach ith step in one of the two ways:

Taking a single step from (i−1)th step.

Taking a step of 2 from (i−2)th step.

So, the total number of ways to reach ith is equal to sum of ways of reaching (i−1)th step and ways of reaching (i−2)thZ step.

Let dp[i] denotes the number of ways to reach on ith step:

dp[i]=dp[i-1]+dp[i-2]



#### Complexity Analysis

* Time complexity : O(n). Single loop upto n.

* Space complexity : O(n). dp array of size n is used.


**************

#### My solution
```
var climbStairs = function(n) {
    let dp = new Array(n+1)
    dp[0] = 1
    dp[1] = 1
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
};
```

 #### Additional reading
 ![leetcode list](https://leetcode.com/tag/dynamic-programming/)

 ![freecode](https://www.freecodecamp.org/news/follow-these-steps-to-solve-any-dynamic-programming-interview-problem-cc98e508cd0e/)

 ![post1](https://leetcode.com/problems/house-robber/discuss/156523/From-good-to-great.-How-to-approach-most-of-DP-problems.)

 ![post2](https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns)

 ![post3](https://leetcode.com/discuss/general-discussion/475924/my-experience-and-notes-for-learning-dp)
