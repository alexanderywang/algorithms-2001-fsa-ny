[19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/).

Given a linked list, remove the n-th node from the end of list and return its head.

#### Example 1:
```
Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
```
#### Notes
* Given n will always be valid.

#### Hints
* DRAW OUT THE STEPS

* KEEP TRACK OF YOUR POINTERS

#### Follow up
* Can you do this in one pass?


#### Hint for follow up
* Maintain two pointers and update one with a delay of n steps.

## Solution

#### Approach #1: Two pass algorithm

<strong>Intuition</strong>

We notice that the problem could be simply reduced to another one : Remove the (L - n + 1)(L−n+1) th node from the beginning in the list , where LL is the list length. This problem is easy to solve once we found list length LL.


<strong>Algorithm</strong>

First we will add an auxiliary "dummy" node, which points to the list head. The "dummy" node is used to simplify some corner cases such as a list with only one node, or removing the head of the list. On the first pass, we find the list length LL. Then we set a pointer to the dummy node and start to move it through the list till it comes to the (L - n)(L−n) th node. We relink next pointer of the (L - n)(L−n) th node to the (L - n + 2)(L−n+2) th node and we are done.

![LL](https://leetcode.com/media/original_images/19_Remove_nth_node_from_end_of_listA.png)

#### My 2 pass solution:
```
var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode(0)
  dummy.next = head
  let length = 0
  let first = head
  while (first !== null) {
      length++
      first = first.next
  }
  length -= n
  first = dummy
  while (length > 0) {
      length--
      first = first.next
  }
  first.next = first.next.next
  return dummy.next
}
```

#### Complexity Analysis

* Time complexity : O(L).

The algorithm makes two traversal of the list, first to calculate list length LL and second to find the (L - n)th node. There are 2L operations and time complexity is O(L).

* Space complexity : O(1).

We only used constant extra space.

**************
#### Approach #2: One pass

The above algorithm could be optimized to one pass. Instead of one pointer, we could use two pointers. The first pointer advances the list by n+1 steps from the beginning, while the second pointer starts from the beginning of the list. Now, both pointers are exactly separated by n nodes apart. We maintain this constant gap by advancing both pointers together until the first pointer arrives past the last node. The second pointer will be pointing at the nth node counting from the last. We relink the next pointer of the node referenced by the second pointer to point to the node's next next node.

![one pass](https://leetcode.com/media/original_images/19_Remove_nth_node_from_end_of_listB.png)

#### Complexity

* Time complexity : O(L).

The algorithm makes one traversal of the list of LL nodes. Therefore time complexity is O(L).

* Space complexity : O(1).

We only used constant extra space.

#### My solution:
```
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0)
    dummy.next = head
    let ptr1 = dummy
    let ptr2 = dummy
    for(let i = 0; i < n; i++){
        ptr1 = ptr1.next
    }
    while (ptr1.next !== null){
        ptr1 = ptr1.next
        ptr2 = ptr2.next
    }
    ptr2.next = ptr2.next.next
    return dummy.next
};
```
