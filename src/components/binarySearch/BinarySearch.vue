<template>
    <div class="container-fluid" >
		<component :is="CurrentAlgorithm"></component>
		<div class="form-row">
			<div class="col-3">
				<label>Input</label>
			</div>
			<div class="col-3">
				<label>Target</label>
			</div>
		</div>
		<div class="form-row">
			<div class="col-3">
				<input  type="text" class="form-control" v-model="Input"/>
			</div>
			<div class="col-3">
				<input  type="text" class="form-control" v-model="Target"/>
			</div>
			<div class="col-3">
				<button type="button" class="btn btn-primary" @click="GetResult()">Get</button>
			</div>
		</div>
       	<label>Result is {{Output}}</label>
       	<br/>
      
       	<br/>
       	<ArrayDiagram ref="diag" v-bind:model-data="diagramData" style="border: solid 1px black; width:100%; height:400px"></ArrayDiagram>
    </div>
</template>

<script>
import ArrayDiagram from '../ArrayDiagram.vue'
import FindTarget from '../binarySearch/FindTarget.vue'

export default {
	name: 'BinarySearch',
	props: ['Tab', 'CurrentAlgorithm'],
	created() {
		this.Algorithm = this.CurrentAlgorithm;
	},
	mounted() {
		window.EventBus.$on('UpdateDiagram', this.updateDiagramFromData)
	},
	components: {
		ArrayDiagram: ArrayDiagram,
		FindTarget: FindTarget
	},
	data() {
		return {
			Output: '',
			Input: '-1,0,3,5,9,12',
		}
	},
	methods: {
		Model() {
			return this.$refs.diag.model(); 
		},
		AddNode(data) {
			var model = this.Model();
			model.startTransaction();
			model.addNodeData(data);
			model.commitTransaction("added Node and Link");
		},
		AddLinkedData(data) {
			var model = this.Model();
			model.startTransaction();
			model.addLinkData(data);
			model.commitTransaction("added Node and Link");
		},
		ClearDiagram() {
			if (!this.diagramData.nodeDataArray.length)
				return;
			var diagram = this.$refs.diag.diagram;
			diagram.startTransaction();
			diagram.clear();
			diagram.commitTransaction("Removed");
		},
		MapInput() {
			var Vue = this;
			this.diagramData.nodeDataArray = $.map(this.Input.split(','), function(value){
				var data = {key: parseInt(value), text: value, color: "grey"};
				Vue.AddNode(data);
				return data;
			});
			this.diagramData.nodeDataArray.sort(function(a,b ){ return a.key - b.key;});
		},
		GetResult() {
			this.ClearDiagram();
			this.MapInput();
			setTimeout(() => {
				this.Output = this.Execute();
			}, 1000);
		},
		updateDiagramFromData() { 
			this.$refs.diag.updateDiagramFromData(); 
		}
	}
}
</script>
