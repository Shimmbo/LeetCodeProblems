<template>
<main role="main">
   <h5>Two Sum</h5>
    <label>
       Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.
    </label>
    <br>
    <label>
     The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2.
    </label>
    <br>
    <strong>Example 1:</strong>
  <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <label>
           <strong>Input:</strong> nums = 2,7,11,15 <strong>target</strong> = 9
        </label>
        <br>
        <label>
          <strong>Output:</strong> 1,2
        </label>    
        <br>
        <label>
          <strong>Explenation:</strong> The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.
        </label>    
    </div>
</main>
</template>

<script>
export default {
	name: 'TwoSum',
}
</script>
<style scoped>
.jumbotron{
    padding: 1rem 1rem !important;
}
</style>
