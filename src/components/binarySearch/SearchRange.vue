<template>
<main role="main">
   <h5>Search for a Range</h5>
    <label>
        Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.
    </label>
    <br>
    <label>
      If the target is not found in the array, return [-1, -1].
    </label>
    <br>
    <strong>Example 1:</strong>
  <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <label>
           <strong>Input:</strong> nums = 5,7,7,8,8,10 <strong>target</strong> = 8
        </label>
        <br>
        <label>
          <strong>Output:</strong> 3,4
        </label>    
    </div>
    <strong>Example 2:</strong>
  <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <label>
            <strong>Input:</strong> nums = 5,7,7,8,8,10 <strong>target</strong> = 6
        </label>
        <br>
        <label>
            <strong>Output:</strong> -1,-1
        </label>
    </div>
</main>
</template>

<script>
export default {
	name: 'SearchRange',
}
</script>
<style scoped>
.jumbotron{
    padding: 1rem 1rem !important;
}
</style>
