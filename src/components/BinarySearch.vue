<template>
    <div class="container-fluid" >
       <input v-model="Input"/>
       <input v-model="Target"/>
       <label>Result is {{Output}}</label>
       <br/>
       <button @click="FindTargetByBinarySearch">Find</button>
       <br/>
       <ArrayDiagram ref="diag" v-bind:model-data="diagramData" v-on:model-changed="modelChanged" v-on:changed-selection="changedSelection" style="border: solid 1px black; width:100%; height:400px"></ArrayDiagram>
    </div>
</template>

<script>
import ArrayDiagram from './ArrayDiagram.vue'
export default {
  name: 'BinarySearch',
  components: {
    ArrayDiagram: ArrayDiagram
  },
  data() {
    return {
      Output: '',
      Input: '',
      Target: '',
      diagramData: {
        nodeDataArray: [],
        linkDataArray: []
      }
    }
  },
  computed: {
          currentNodeText: {
            get: function() {
              var node = this.currentNode;
              if (node instanceof go.Node) {
                return node.data.text;
              } else {
                return "";
              }
            },
            set: function(val) {
              var node = this.currentNode;
              if (node instanceof go.Node) {
                var model = this.model();
                model.startTransaction();
                model.setDataProperty(node.data, "text", val);
                model.commitTransaction("edited text");
              }
            }
          }
        },
  methods: {
    MapInput() {
      this.diagramData.nodeDataArray = $.map(this.Input.split(','), function(value){
        return {key: parseInt(value, 10), text: value};
      })
      this.diagramData.nodeDataArray.sort(function(a,b ){ return a.key - b.key;});
      for(var i = 0; i < this.diagramData.nodeDataArray.length - 1; i++)
        this.diagramData.linkDataArray.push({from: this.diagramData.nodeDataArray[i].key, to: this.diagramData.nodeDataArray[i+1].key})
    },
    FindTargetByBinarySearch() {
      this.MapInput();
      this.updateDiagramFromData();
      console.log(this.diagramData);
      var index = this.diagramData.nodeDataArray.length / 2;
      var middle = this.diagramData.nodeDataArray[index].key;
      var from = 0;
      var to = index;
      if (this.Target >= middle){
        from = index;
        to = this.diagramData.nodeDataArray.length;
      }
      for(var i = from; i < to; i++)
      {
        if (this.diagramData.nodeDataArray[i].key == this.Target) {
          this.Output = i;
          return;
        };
      }
      this.Output = -1;
    },
    model() {
      return this.$refs.diag.model(); 
    },
    updateDiagramFromData() { 
      this.$refs.diag.updateDiagramFromData(); 
    },
    modelChanged: function(e) {
      if (e.isTransactionFinished) {
        this.savedModelText = e.model.toJson();
      }
    },
    changedSelection: function(e) {
      var node = e.diagram.selection.first();
      if (node instanceof go.Node) {
        this.currentNode = node;
        this.currentNodeText = node.data.text;
      } else {
        this.currentNode = null;
        this.currentNodeText = "";
      }
    },
  }
}
</script>
