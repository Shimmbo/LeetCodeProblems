<template>
<main role="main">
   <h5>Search in a Binary Search Tree</h5>
    <label>
     Given the root node of a binary search tree (BST) and a value. You need to find the node in the BST that the node's value equals the given value. Return the preorder subtree rooted with that node. If such node doesn't exist, you should return [].
    </label>
    <br>
    <strong>Example 1:</strong>
    <div class="jumbotron">
        <label class="problem-heading">
           <strong>Input:</strong> 4,2,7,1,3
        </label>
        <label class="wrap">
             4
            / \
          2   7
         / \
       1   3
        </label>
        <br>
        <label>
          <strong>Target:</strong> 2
        </label>
        <br>
        <label>
          <strong>Output:</strong> Preorder result: [2,1,3]
        </label> 
    </div>
</main>
</template>

<script>
export default {
	name: 'SearchValue',
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
