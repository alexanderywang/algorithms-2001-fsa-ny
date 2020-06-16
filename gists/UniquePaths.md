[leetcode: 62. Unique Paths](https://leetcode.com/problems/unique-paths/).

A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

![example](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

#### Example 1:
```
Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Right -> Down
2. Right -> Down -> Right
3. Down -> Right -> Right
```
#### Example 2:
```
Input: m = 7, n = 3
Output: 28
```
#### Constraints:
* 1 <= m, n <= 100
* It's guaranteed that the answer will be less than or equal to 2 * 10 ^ 9.
#### Hints
* To reach square, how did you get there? (From above or to the left)

## Solution
Since robot can move either down or right, there is only one path to reach the cells in the first row: right->right->...->right.

![traversal](https://leetcode.com/problems/unique-paths/Figures/62/first_row2.png)

The same is valid for the first column, though the path here is down->down-> ...->down.

![traversal2](https://leetcode.com/problems/unique-paths/Figures/62/first_col2.png)

What about the "inner" cells (m, n)? To such cell one could move either from the upper cell (m, n - 1), or from the cell on the right (m - 1, n). That means that the total number of paths to move into (m, n) cell is uniquePaths(m - 1, n) + uniquePaths(m, n - 1).

![traversal3](https://leetcode.com/problems/unique-paths/Figures/62/inner_cell2.png)

Now, one could transform these ideas into 3-liner recursive solution:
```
class Solution {
  public int uniquePaths(int m, int n) {
    if (m == 1 || n == 1) {
      return 1;
    }
    return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
  }
}
```

#### Approach #1: Dynamic Programming

One could rewrite recursive approach into dynamic programming one.

<strong>Algorithm</strong>

* Initiate 2D array d[m][n] = number of paths. To start, put number of paths equal to 1 for the first row and the first column. For the simplicity, one could initiate the whole 2D array by ones.

* Iterate over all "inner" cells: d[col][row] = d[col - 1][row] + d[col][row - 1].

* Return d[m - 1][n - 1].

#### Complexity Analysis

* Time complexity:O(N×M).

* Space complexity: O(N×M).

**************
Approach: fill top row and left most column with 1s. There's only one way to get there.  Build from bottom up.  Ways to reach each square will be the sum of <strong>ways to reach the square above it</strong> and the <strong>ways to reach the square to the left of it.</strong>
#### My solution
```
var uniquePaths = function(m, n) {
    let dp = new Array(m).fill(new Array(n))
    for (let i = 0; i < dp.length; i++){
        dp[i][0] = 1
    }
    for (let i = 0; i < dp[0].length;i++) {
        dp[0][i] = 1
    }
    // console.log(dp)

    //add up all the ways to get to current cell, from above and left
    for (let i = 1; i < dp.length; i++){
        for (let j =1; j < dp[i].length; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }
    //want to find out how many ways to get to bottom right corner
    return dp[m-1][n-1]
};
```

 #### Additional reading
 ![leetcode list](https://leetcode.com/tag/dynamic-programming/)

 ![freecode](https://www.freecodecamp.org/news/follow-these-steps-to-solve-any-dynamic-programming-interview-problem-cc98e508cd0e/)

 ![post1](https://leetcode.com/problems/house-robber/discuss/156523/From-good-to-great.-How-to-approach-most-of-DP-problems.)

 ![post2](https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns)

 ![post3](https://leetcode.com/discuss/general-discussion/475924/my-experience-and-notes-for-learning-dp)
