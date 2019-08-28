<template>
<main role="main">
   <h5>Path Sum</h5>
    <label>
      Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.
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
           <strong>Input:</strong> 5,4,8,11,null,13,4,7,2,null,null,null,1<strong>Target:</strong>  Sum = 22
        </label>
        <label class="wrap">
             5
            / \
          4    8
        /      / \
     11   13    4
    /  \              \
  7    2               1
        </label>
        <br>
        <label>
          <strong>Output:</strong> return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.
        </label> 
    </div>
</main>
</template>

<script>
export default {
	name: 'PathSum',
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
