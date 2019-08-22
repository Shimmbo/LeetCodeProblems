<script>
export default {
	data () {
		return {
			Algorithm: '',
			diagramData: {
				nodeDataArray: [],
				linkDataArray: []
			},
			Target: 0,
		}
	},
	methods: {
		Execute() {
			return this[this.Algorithm](this.diagramData, this.Target);
		},
		ChangeColor(i, time){
			var data = this.diagramData;
			setTimeout(() => {
				data.nodeDataArray.forEach(function(node){
					if (node.key == i)
						node.color = "red";
					else if (node.color == "red")
						node.color = "green";
				})
				window.EventBus.$emit('UpdateDiagram', i);
			}, time * 1000);
		},
		BinarySearch() {
			var time = 1;
			var index = parseInt(this.diagramData.nodeDataArray.length / 2);
			var middle = this.diagramData.nodeDataArray[index].key;
			this.ChangeColor(middle, time++);
			var from = 0;
			var to = index;
			if (this.Target >= middle){
				from = index;
				to = this.diagramData.nodeDataArray.length;
			}
			for(var i = from; i < to; i++)
			{
				this.ChangeColor(this.diagramData.nodeDataArray[i].key, time++);
				if (this.diagramData.nodeDataArray[i].key == this.Target) {
					return i;
				};
			}
			return "Not found";	
		}
	}
}
</script>