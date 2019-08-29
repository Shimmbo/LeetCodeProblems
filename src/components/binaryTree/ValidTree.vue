<template>
<main role="main">
   <h5>Validate Binary Search Tree</h5>
    <label>
      Given a binary tree, determine if it is a valid binary search tree (BST).
    </label>
    <br>
    <label>
      Assume a BST is defined as follows:
    </label>
    <ul>
            <li>The left subtree of a node contains only nodes with keys less than the node's key.</li>
            <li>The right subtree of a node contains only nodes with keys greater than the node's key.</li>
            <li>Both the left and right subtrees must also be binary search trees.</li>
        </ul>
    <br>
    <strong>Example 1:</strong>
    <div class="jumbotron">
        <label class="problem-heading">
           <strong>Input:</strong> 2,1,3
        </label>
        <label class="wrap">
             2
            / \
          1   3
        </label>
        <br>
        <label>
          <strong>Output:</strong> true
        </label> 
    </div>
    <strong>Example 2:</strong>
    <div class="jumbotron">
        <label class="problem-heading">
           <strong>Input:</strong> 5,1,4,null,null,3,6
        </label>
        <label class="wrap">
           5
          / \
        1     4
              / \
            3   6
        </label>
        <br>
        <label>
          <strong>Output:</strong> false
        </label> 
        <label>
          <strong>Explanation:</strong> The root node's value is 5 but its right child's value is 4.
        </label> 
    </div>
</main>
</template>

<script>
export default {
	name: 'ValidTree',
}
</script>
<style scoped>
.jumbotron{
    padding: 1rem 1rem !important;
}
.wrap{
    white-space: pre-wrap
}
.problem-heading{
    display: block
}
</style>
