<template>
<main role="main">
   <h5>Maximum Depth of Binary Tree</h5>
    <label>
      Given a binary tree, find its maximum depth.
    </label>
    <br>
    <label>
    The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
    </label>
    <br>
    <label>
        <strong>Note:</strong>A leaf is a node with no children.
    </label>
    <br>
    <strong>Example 1:</strong>
  <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <label class="problem-heading">
           <strong>Input:</strong> 3,9,20,null,null,15,7
        </label>
        <label class="wrap">
             3
            / \
            9  20
              /  \
            15    7
        </label>
        <br>
        <label>
          <strong>Output:</strong> Depth = 3
        </label> 
    </div>
</main>
</template>

<script>
export default {
	name: 'MaximumDepth',
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
