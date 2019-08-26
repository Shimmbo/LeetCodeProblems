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
import MaximumDepth from '../binaryTree/MaximumDepth.vue'

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
        MaximumDepth: MaximumDepth
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
			items = this.Input.split(',');
			console.log(this.Deserialize(this.Input))
        },
        Deserialize(data) {
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
                        this.AddNode(cur.right);
                        this.AddLinkedData({from: cur.key, to: cur.right.key});
                        q.push(cur.right);
                    }
                }
                left = !left;
            }
            return root;
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
		},
		SetInputDefaults() {
			switch(this.CurrentAlgorithm){
				case 'MaximumDepth':
					this.Input = '3,9,20,null,null,15,7';
					break;
				case 'FindPeak':
					this.Input = '1,2,3,1';
					break;
				case 'SearchRange':
					this.Input = '5,7,7,8,8,10';
					this.Target = '8'
					break;
				case 'TwoSum':
					this.Input = '2,7,11,15';
					this.Target = '9'
					break;
			}
		}
	}
}
</script>
