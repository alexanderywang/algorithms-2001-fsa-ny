[leetcode: 589. N-ary Tree Preorder Traversal](https://leetcode.com/problems/n-ary-tree-preorder-traversal/).

Given an n-ary tree, return the preorder traversal of its nodes' values.

#### Follow up: DO BOTH
Recursive solution is trivial, could you do it iteratively?

#### Definition of TreeNode
function Node(val, children) {
   this.val = val;
   this.children = children;
}
* every node has a null child in addition to any other children
#### Example 1:
![ex1](https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png)
```
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,3,5,6,2,4]
```
#### Example 2:
![ex2](https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png)
```
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]
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
var preorder = function(root) {
    const result = []

    const preOrderTraverse = (node) => {
        if (node === null) return
        result.push(node.val);
        for (child of node.children) {
            preOrderTraverse(child);
        }
    }

    preOrderTraverse(root)
    return result
}
```
#### Nelson's cleaner solution
```
var preorder = function(root, ordered = []) {

  // let ordered = [];
  // traverse(root)

    if (root === null) {
      return ordered;
    }
    if (root.children !== null){
    ordered.push(root.val)
    root.children.forEach(child => preorder(child, ordered));
    }

  return ordered
}
```


#### Complexity Analysis

* Time Complexity : O(n).

* Space Complexity : O(log n) on average. O(n) in worst case if tree is unbalanced

#### Approach #2: Iterative

Let's start from the root and then at each iteration pop the current node out of the stack and push its child nodes. In the implemented strategy we push nodes into output list following the order Top->Bottom and Left->Right, that naturally reproduces preorder traversal.

* walk through example to see [1,3,2,4...] gets pushed to stack and popped off in reverse [4, 2, 3] result pushes in 3 first...
```
const preorder = function(root) {
    const result = []
    if (root === null) return result
    const stack = [root]
    while (stack.length) {
        let current = stack.pop()
        if (current === null) continue
        result.push(current.val)
        stack.push(...current.children.reverse())
    }
    return result
}
```
#### Complexity Analysis

* Time complexity : we visit each node exactly once, and for each visit, the complexity of the operation (i.e. appending the child nodes) is proportional to the number of child nodes n (n-ary tree). Therefore the overall time complexity is O(n), where n is the number of nodes, i.e. the size of tree.

* Space complexity : depending on the tree structure, we could keep up to the entire tree, therefore, the space complexity is O(n).

#### Nelson's cleaner solution:
```
var preorder = function(root) {
  let ordered = [];
  if (root === null) {
    return ordered;
  }

  let stack = [root];

  while (stack.length) {
    let node = stack.pop()
    if (node === null) {
      continue;
    }

    ordered.push(node.val);
    if (node.children) {
      stack.push(...node.children.reverse())
    }
  }
  return ordered
}
```
