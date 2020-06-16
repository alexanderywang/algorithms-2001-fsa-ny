[590. N-ary Tree Postorder Traversal](https://leetcode.com/problems/n-ary-tree-postorder-traversal/).

Given an n-ary tree, return the postorder traversal of its nodes' values.

#### Follow up: DO BOTH
Recursive solution is trivial, could you do it iteratively?

#### Definition of TreeNode
function Node(val, children) {
   this.val = val;
   this.children = children;
}

* every child has a null child and then any remaining children.

#### Example 1:
![ex1](https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png)
```
Input: root = [1,null,3,2,4,null,5,6]
Output: [5,6,3,2,4,1]
```
#### Example 2:
![ex2](https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png)
```
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]
```
#### Constraints
* The height of the n-ary tree is less than or equal to 1000
* The total number of nodes is between [0, 10^4]

#### Hints and Keys

* Think about time and space complexity
* Think about what data structures to use

## Solution

#### Approach #1: Recursive

```
var postorder = function(root) {
    const result = []
    postOrderTraverse(root)
    return result

    function postOrderTraverse(node) {
        if (node === null) return
        for(child of node.children) {
            postOrderTraverse(child)
        }
        result.push(node.val)
    }
}
```

#### Complexity Analysis

* Time Complexity : O(n).

* Space Complexity : O(log n) on average. O(n) in worst case if tree is unbalanced

#### Approach #2: Iterative

Let's start from the root and then at each iteration pop the current node out of the stack and push its child nodes. In the implemented strategy we push nodes into stack following the order Top->Bottom and Left->Right. Since DFS postorder traversal is Bottom->Top and Left->Right the output list should be reverted after the end of loop.

* walk through the example to see how stack gets [1 ,2 ,3, 4...] and ends up popping off and pushing into result array in reverse.
```
var postorder = function(root) {
    const result = []

    if (root === null) {
        return result
    }
    const stack = [root]

    while (stack.length) {
        let current = stack.pop()
        if (current === null) continue
        result.push(current.val)
        stack.push(...current.children)
    }
    return result.reverse()
};
```
#### Complexity Analysis

* Time complexity : we visit each node exactly once, and for each visit, the complexity of the operation (i.e. appending the child nodes) is proportional to the number of child nodes n (n-ary tree). Therefore the overall time complexity is O(n), where n is the number of nodes, i.e. the size of tree.

* Space complexity : depending on the tree structure, we could keep up to the entire tree, therefore, the space complexity is O(n).
