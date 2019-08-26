<template>
	<div class="bg-light border-right" id="sidebar-wrapper">
		<div class="sidebar-heading">LeetCode Problems</div>
		<div class="list-group list-group-flush sidenav">
			<button class="dropdown-btn active" @click="OpenDropDown">Binary Search</button>
			<div class="dropdown-container drop-active">
				<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'FindTarget', 'Find Target', true, true)">Find Target</a>
				<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'FindPeak', 'Find Peak Element', false, false)">Find Peak Element</a>
				<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'SearchRange', 'Search for a Range', true, true)">Search for a Range</a>
				<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'TwoSum', 'Two Sum', true, true)">Two Sum</a>
			</div>
			<button class="dropdown-btn" @click="OpenDropDown">Binary Tree</button>
			<div class="dropdown-container">
				<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinaryTree', 'MaximumDepth', 'Maximum Depth of Binary Tree', false, false)">Maximum Depth</a>
				<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'FindPeak', 'Find Peak Element', false, false)">Find Peak Element</a>
				<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'SearchRange', 'Search for a Range', true, true)">Search for a Range</a>
				<a href="#" class="list-group-item list-group-item-action bg-light" @click="SetTabAlgorithm('BinarySearch', 'TwoSum', 'Two Sum', true, true)">Two Sum</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SideBar',
  	methods: {
		SetTabAlgorithm(tab, algorithm, name, needTarget, needSort){
			
			this.$emit('SetTab', tab, algorithm, name, needTarget, needSort);
		},
		OpenDropDown($event) {
			$event.target.classList.toggle("active");
			var dropdownContent = $event.target.nextElementSibling;
			if (dropdownContent.style.display === "block") {
				dropdownContent.style.display = "none";
			} else {
				dropdownContent.style.display = "block";
			}
		}
 	 }
}
</script>
