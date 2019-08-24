<template>
    <div class="container-fluid" >
		<component :is="CurrentAlgorithm"></component>
		<div class="form-row">
			<div class="col-3">
				<label>Input</label>
			</div>
			<div class="col-3" v-if="NeedTarget">
				<label>Target</label>
			</div>
		</div>
		<div class="form-row">
			<div class="col-3">
				<input  type="text" class="form-control" v-model="Input" :class="{'is-valid': IsInputValid, 'is-invalid': !IsInputValid}"/>
			</div>
			<div class="col-3" v-if="NeedTarget">
				<input  type="text" class="form-control" v-model="Target" :class="{'is-valid': IsTargetValid, 'is-invalid': !IsTargetValid}"/>
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
import FindPeak from '../binarySearch/FindPeak.vue'

export default {
	name: 'BinarySearch',
	props: ['Tab', 'CurrentAlgorithm', 'NeedTarget', 'NeedSort'],
	created() {
		this.Algorithm = this.CurrentAlgorithm;
		this.Input = '-1,0,3,5,9,12';
		this.Pattern = /^[-0-9.,]+$/
	},
	mounted() {
		window.EventBus.$on('UpdateDiagram', this.updateDiagramFromData)
	},
	components: {
		ArrayDiagram: ArrayDiagram,
		FindTarget: FindTarget,
		FindPeak: FindPeak
	},
	data() {
		return {
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
			var items = [];
			if (this.NeedSort){
				items = this.Input.split(',').sort(function(a, b){
					return parseInt(a) - parseInt(b);
				})
			}
			else {
				items = this.Input.split(',');
			}
			this.diagramData.nodeDataArray = items.map(function(value, index){
				var data = {key: index, text: value, value: parseInt(value), color: "white"};
				Vue.AddNode(data);
				return data;
			})
		},
		GetResult() {
			if (!this.IsFormValid())
				return alert('Form not valid');
			this.ClearDiagram();
			this.$refs.diag.setContentAlign(); 
			this.MapInput();
			setTimeout(() => {
								this.updateDiagramFromData();
				this.Execute();
			}, 1000);
		},
		updateDiagramFromData() { 
			this.$refs.diag.updateDiagramFromData(); 
		}
	}
}
</script>
