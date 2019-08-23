<template>
<main role="main">
   <h5>Find Target</h5>
    <label>
        Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If target exists, then return its index, otherwise return -1.
    </label>
    <br>
    <strong>Example 1:</strong>
  <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <label>
           <strong>Input:</strong> nums = -1,0,3,5,9,12, <strong>target</strong> = 9
        </label>
        <br>
        <label>
          <strong>Output:</strong> 4
        </label>
        <br>
        <label>
          Explanation: 9 exists in nums and its index is 4
        </label>
        
    </div>
    <strong>Example 2:</strong>
  <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <label>
            <strong>Input:</strong> nums = -1,0,3,5,9,12, <strong>target</strong> = 2
        </label>
        <br>
        <label>
            <strong>Output:</strong> Not Found
        </label>
        <br>
        <label>
             2 does not exist in nums so return -1
        </label>
        
    </div>
</main>
</template>

<script>
export default {
	name: 'FindTarget',
}
</script>
<style scoped>
.jumbotron{
    padding: 1rem 1rem !important;
}
</style>
