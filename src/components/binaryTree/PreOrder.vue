<template>
<main role="main">
   <h5>Binary Tree Preorder Traversal</h5>
    <label>
      Given a binary tree, return the preorder traversal of its nodes' values.
    </label>
    <br>
    <strong>Example 1:</strong>
  <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <label class="problem-heading">
           <strong>Input:</strong> 1,null,2,3
        </label>
        <label class="wrap">
           1
            \
             2
            /
           3
        </label>
        <br>
        <label>
          <strong>Output:</strong> [1,2,3]
        </label> 
    </div>
</main>
</template>

<script>
export default {
	name: 'PreOrder',
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
