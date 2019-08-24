<template>
	<div class="bg-light border-right" id="sidebar-wrapper">
		<div class="sidebar-heading">LeetCode Problems</div>
		<div class="list-group list-group-flush">
			<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'FindTarget', 'Binary Search')">Binary Search</a>
			<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'FindTarget', 'Binary Search', true, true)">Find Target</a>
			<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'FindPeak', 'Find Peak Element', false, false)">Find Peak Element</a>
			<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('Test')">Shortcuts</a>
			<a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
			<a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
			<a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
			<a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SideBar',
  	methods: {
		SetTabAlgorithm(tab, algorithm, name, needTarget, needSort){
			this.$emit('SetTab', tab, algorithm, name, needTarget, needSort);
		}
 	 }
}
</script>
