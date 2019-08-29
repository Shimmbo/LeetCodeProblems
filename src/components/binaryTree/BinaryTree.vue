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
       	<strong>Result is {{Output}}</strong>
       	<br/>
      
       	<br/>
       	<ArrayDiagram ref="diag" v-bind:model-data="diagramData" style="border: solid 1px black; width:100%; height:400px"></ArrayDiagram>
    </div>
</template>

<script>
import ArrayDiagram from '../ArrayDiagram.vue'
import MaximumDepth from '../binaryTree/MaximumDepth.vue'
import PathSum from '../binaryTree/PathSum.vue'
import PreOrder from '../binaryTree/PreOrder.vue'
import InOrder from '../binaryTree/InOrder.vue'
import ValidTree from '../binaryTree/ValidTree.vue'
import SearchValue from '../binaryTree/SearchValue.vue'

export default {
	name: 'BinaryTree',
	props: ['Tab', 'CurrentAlgorithm', 'NeedTarget', 'NeedSort'],
	created() {
		this.Algorithm = this.CurrentAlgorithm;
		this.SetInputDefaults();
		this.Pattern = /^[-0-9null.,]+$/
	},
	mounted() {
		window.EventBus.$on('UpdateDiagram', this.updateDiagramFromData)
	},
	components: {
        ArrayDiagram: ArrayDiagram,
		MaximumDepth: MaximumDepth,
		PathSum: PathSum,
		PreOrder: PreOrder,
		InOrder: InOrder,
		ValidTree: ValidTree,
		SearchValue: SearchValue
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
			this.Deserialize(this.Input)
        },
        Deserialize(data) {
			this.diagramData.nodeDataArray = [];
			this.diagramData.linkDataArray = [];
            if (data == "") return null;
            var strs = data.split(",");
            var root = {
                value: parseInt(strs[0]),
                key: parseInt(strs[0]),
                text: strs[0],
                color: 'white'
            };
            var q = [];
			q.push(root);
			this.diagramData.nodeDataArray.push(root);
			this.AddNode(root);
            var left = true;
            var cur = null;
            for (var i = 1; i < strs.length; ++i) {
                if (left)
                    cur = q.shift();
                if (strs[i] != "null") {
                    if (left) {
                        cur.left = {
                            value: parseInt(strs[i]),
                            key: parseInt(strs[i]),
                            text: strs[i],
                            color: 'white'
						};
						this.diagramData.nodeDataArray.push(cur.left);
						this.diagramData.linkDataArray.push({from: cur.key, to: cur.left.key})
                        this.AddNode(cur.left);
                        this.AddLinkedData({from: cur.key, to: cur.left.key});
                        q.push(cur.left);
                    } else {
                        cur.right = {
                            value: parseInt(strs[i]),
                            key: parseInt(strs[i]),
                            text: strs[i],
                            color: 'white'
						}
						this.diagramData.nodeDataArray.push(cur.right);
						this.diagramData.linkDataArray.push({from: cur.key, to: cur.right.key})
                        this.AddNode(cur.right);
                        this.AddLinkedData({from: cur.key, to: cur.right.key});
                        q.push(cur.right);
                    }
                }
                left = !left;
			}
			this.$refs.diag.updateModel(this.Model())
            return root;
        },
		GetResult() {
			if (!this.IsFormValid())
				return alert('Form not valid');
			this.ClearDiagram();
			this.$refs.diag.setContentAlign(); 
			this.$refs.diag.diagram.div.style.height = "400px";
			this.MapInput();
			setTimeout(() => {
                this.updateDiagramFromData();
				this.Execute();
			}, 1000);
		},
		updateDiagramFromData() { 
			this.$refs.diag.updateDiagramFromData(); 
		},
		SetInputDefaults() {
			switch(this.CurrentAlgorithm){
				case 'MaximumDepth':
					this.Input = '3,9,20,null,null,15,7';
					break;
				case 'PathSum':
					this.Input = '5,4,8,11,null,13,4,7,2,null,null,null,1';
					break;
				case 'PreOrder':
				case 'InOrder':
					this.Input = '1,null,2,3';
					break;
				case 'ValidTree':
					this.Input = '2,1,3'
					break;
				case 'SearchValue':
					this.Input = '4,2,7,1,3';
					this.Target = 2;
					break;
			}
		}
	}
}
</script>
