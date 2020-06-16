[286. Walls and Gates](https://leetcode.com/problems/walls-and-gates/).

You are given a m x n 2D grid initialized with these three possible values.

1. -1 - A wall or an obstacle.
2. 0 - A gate.
3. INF - Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

#### Example 1:
```
Given the 2D grid:

INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF
After running your function, the 2D grid should be:

  3  -1   0   1
  2   2   1  -1
  1  -1   2  -1
  0  -1   3   4
```

#### Hints
* it's a graph
* can't go through walls

## Solution

#### Approach #1 (Brute Force) [Time Limit Exceeded]

The brute force approach is simple, we just implement a breadth-first search from each empty room to its nearest gate.

While we are doing the search, we use a 2D array called distance to keep track of the distance from the starting point. It also implicitly tell us whether a position had been visited so it won't be inserted into the queue again.

```
private static final int EMPTY = Integer.MAX_VALUE;
private static final int GATE = 0;
private static final int WALL = -1;
private static final List<int[]> DIRECTIONS = Arrays.asList(
        new int[] { 1,  0},
        new int[] {-1,  0},
        new int[] { 0,  1},
        new int[] { 0, -1}
);

public void wallsAndGates(int[][] rooms) {
    if (rooms.length == 0) return;
    for (int row = 0; row < rooms.length; row++) {
        for (int col = 0; col < rooms[0].length; col++) {
            if (rooms[row][col] == EMPTY) {
                rooms[row][col] = distanceToNearestGate(rooms, row, col);
            }
        }
    }
}

private int distanceToNearestGate(int[][] rooms, int startRow, int startCol) {
    int m = rooms.length;
    int n = rooms[0].length;
    int[][] distance = new int[m][n];
    Queue<int[]> q = new LinkedList<>();
    q.add(new int[] { startRow, startCol });
    while (!q.isEmpty()) {
        int[] point = q.poll();
        int row = point[0];
        int col = point[1];
        for (int[] direction : DIRECTIONS) {
            int r = row + direction[0];
            int c = col + direction[1];
            if (r < 0 || c < 0 || r >= m || c >= n || rooms[r][c] == WALL
                    || distance[r][c] != 0) {
                continue;
            }
            distance[r][c] = distance[row][col] + 1;
            if (rooms[r][c] == GATE) {
                return distance[r][c];
            }
            q.add(new int[] { r, c });
        }
    }
    return Integer.MAX_VALUE;
}
```
#### Complexity Analysis
* Time complexity : O(m^2 * n^2) For each point in the m×n size grid, the gate could be at most m×n steps away.

* Space complexity : O(mn). The space complexity depends on the queue's size. Since we won't insert points that have been visited before into the queue, we insert at most m×n points into the queue.

#### Approach not listed on LeetCode: Depth First Search
<strong>Intuition</strong>

Use graph traversing algorithm. Iterate through grid and measure distance to gates.  Every time you find a gate, run a dfs. Reach every cell from the gate

<strong>Algorithm</strong>

In dfs, pass a count variable to increment as you traverse. Update each cell with the count.

* Iterate through entire grid.
* run dfs only on cells that are gates
* check bounds
* check if cell has been previously visited with a shorter path (count), you don't want to update with a worse count
* set grid[i][j] with a count
* check all 4 directions


#### My solution:
```
const dfs = (i, j, count, grid) => {
    // check bounds, grid[i][j] < count ==> checks to see if we visited this cell already, we don't want to update with a larger count
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || grid[i][j] < count) {
        return
    }
    // if conditional doesn't return, we need to record steps on this cell
    grid[i][j] = count
    // traverse neighboring cells
    dfs(i+1, j, count + 1, grid)
    dfs(i-1, j, count + 1, grid)
    dfs(i, j+1, count + 1, grid)
    dfs(i, j-1, count + 1, grid)
}

var wallsAndGates = function(rooms) {
    for (let i = 0; i < rooms.length; i++){
        for (let j = 0; j < rooms[i].length; j++){
            if (rooms[i][j] === 0) {
                dfs(i, j, 0, rooms)
            }
        }
    }
};
```

#### Complexity Analysis

* Time Complexity: O(N). We go through all the gates

* Space Complexity: O(1). in place

#### my BFS solution:
```
var wallsAndGates = function(rooms) {
    if (rooms === null || rooms.length ===0) return null
    let queue = []
    // fill queue with coordinates for 0s
    for (let i = 0; i < rooms.length; i ++){
        for (let j = 0; j < rooms[i].length; j++){
            if (rooms[i][j] === 0){
                queue.push([i,j])
            }
        }
    }
    // console.log(queue)
    let directions = [[1,0],[-1,0],[0,1],[0,-1]]
    while (queue.length) {
        let [row,col] = queue.shift()
        directions.forEach(direction => {
            let i = row + direction[0]
            let j = col + direction[1]
            if (i < 0 || j < 0 || i >= rooms.length || j >= rooms[i].length || rooms[i][j] <= rooms[row][col]) {
                return
            }
            rooms[i][j] = rooms[row][col] + 1
            queue.push([i,j])
        })
    }
}
```
