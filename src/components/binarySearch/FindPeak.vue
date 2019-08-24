<template>
    <main role="main">
    <h5>Find Peak Element</h5>
        <label>
            A peak element is an element that is greater than its neighbors.
        </label>
        <br>
        <label>
        Given an input array nums, where nums[i] ≠ nums[i+1], find a peak element and return its index.
        </label>
        <br>
        <label>
        The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.
        </label>
        <br>
        <strong>Example 1:</strong>
    <!-- Main jumbotron for a primary marketing message or call to action -->
        <div class="jumbotron">
            <label>
            <strong>Input:</strong> nums = 1,2,3,1
            </label>
            <br>
            <label>
            <strong>Output:</strong> 2
            </label>
            <br>
            <label>
            Explanation:  3 is a peak element and your function should return the index number 2.
            </label>
            
        </div>
        <strong>Example 2:</strong>
    <!-- Main jumbotron for a primary marketing message or call to action -->
        <div class="jumbotron">
            <label>
                <strong>Input:</strong> nums = 1,2,1,3,5,6,4
            </label>
            <br>
            <label>
                <strong>Output:</strong> 1 or 5
            </label>
            <br>
            <label>
                Your function can return either index number 1 where the peak element is 2, 
                or index number 5 where the peak element is 6.
            </label>
            
        </div>
    </main>
</template>

<script>
export default {
	name: 'FindPeak',
}
</script>
<style scoped>
.jumbotron{
    padding: 1rem 1rem !important;
}
</style>
