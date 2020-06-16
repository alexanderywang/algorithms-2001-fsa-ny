[leetcode: 230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/).

Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

#### Note:
You may assume k is always valid, 1 ≤ k ≤ BST's total elements.

#### Example 1:
```
Input: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
Output: 1

```
#### Example 2:
```
Input: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
Output: 3

```
#### Follow up:
What if the BST is modified (insert/delete operations) often and you need to find the kth smallest frequently? How would you optimize the kthSmallest routine?



#### Hints and Keys

* Try to utilize the property of a BST.

* Try an in-order traversal

## Solution
How to traverse the tree
There are two general strategies to traverse a tree:

* Depth First Search (DFS)

In this strategy, we adopt the depth as the priority, so that one would start from a root and reach all the way down to certain leaf, and then back to root to reach another branch.

The DFS strategy can further be distinguished as preorder, inorder, and postorder depending on the relative order among the root node, left node and right node.

* Breadth First Search (BFS)

We scan through the tree level by level, following the order of height, from top to bottom. The nodes on higher level would be visited before the ones with lower levels.

On the following figure the nodes are numerated in the order you visit them, please follow 1-2-3-4-5 to compare different strategies.

![dfs bfs](https://leetcode.com/problems/kth-smallest-element-in-a-bst/Figures/230/bfs_dfs.png)

To solve the problem, one could use the property of BST : inorder traversal of BST is an array sorted in the ascending order.

#### Approach #1: Recursion

It's a very straightforward approach with O(N) time complexity. The idea is to build an inorder traversal of BST which is an array sorted in the ascending order. Now the answer is the k - 1th element of this array.

![tree](https://leetcode.com/problems/kth-smallest-element-in-a-bst/Figures/230/inorder.png)


#### Complexity Analysis

* Time complexity : O(N) to build a traversal.
* Space complexity : O(N) to keep an inorder traversal.


#### Approach #2: Iteration

The above recursion could be converted into iteration, with the help of stack. This way one could speed up the solution because there is no need to build the entire inorder traversal, and one could stop after the kth element.
![stack](https://leetcode.com/problems/kth-smallest-element-in-a-bst/Figures/230/iteration.png)

#### Complexity Analysis

*Time complexity : O(H+k), where H is a tree height. This complexity is defined by the stack, which contains at least H+k elements, since before starting to pop out one has to go down to a leaf. This results in O(log N+k) for the balanced tree and O(N+k) for completely unbalanced tree with all the nodes in the left subtree.
Space complexity : O(H+k), the same as for time complexity, O(N+k) in the worst case, and O(log N+k) in the average case.

********
#### My inorder recursive solution:
```
// in order traversal will be [] in asc order, return k-1th element in array
const inorder = (root, nums, k) => {
    if (root === null) return
    inorder(root.left, nums, k)
    if (++nums[0] === k) {
        nums[1] = root.val
        return
    }
    inorder(root.right, nums, k)
}

var kthSmallest = function(root, k) {
    let nums = [0,null] // [position, element], return nums[1]
    inorder(root, nums, k)
    return nums[1]
};
```
* Note on the ++nums[0]
```
let num = 0
++num // outputs 0
num // outputs 1
BUT
let num = 0
++num // outputs 1
num // outputs 1
```

**** Iterative with stack solution:
```
var kthSmallest = function(root, k) {
let stack = []
    while (true) {
        while (root !== null) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        if (--k === 0) return root.val
        root = root.right
    }
 }
 ```
