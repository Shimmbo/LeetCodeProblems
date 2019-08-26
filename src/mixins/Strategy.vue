<script>
import { isNumber } from 'util';
export default {
	data () {
		return {
			Algorithm: '',
			diagramData: {
				nodeDataArray: [],
				linkDataArray: []
			},
			Target: 0,
			Output: '',
			Input: '',
			Pattern: ''
		}
	},
	computed: {
		IsInputValid(){
			return  (this.Input != "")  && (this.Pattern.test(this.Input));
		},
		IsTargetValid(){
			return !isNaN(this.Target);
		}
	},
	methods: {
		Execute() {
			return this[this.Algorithm](this.diagramData, this.Target);
		},
		IsFormValid(){
			return this.IsInputValid && this.IsTargetValid;
		},
		ChangeColor(i, time, selectedColor){
			var data = this.diagramData;
			setTimeout(() => {
				data.nodeDataArray.forEach(function(node){
					if (node.key == i)
						node.color = selectedColor;
					else if (node.color != 'white')
						node.color = "green";
				})
				window.EventBus.$emit('UpdateDiagram', i);
			}, time * 1000);
		},
		FindTarget() {
			var time = 1;
			var index = parseInt(this.diagramData.nodeDataArray.length / 2);
			var middle = this.diagramData.nodeDataArray[index].value;
			this.ChangeColor(this.diagramData.nodeDataArray[index].key, time++, "red");
			var from = 0;
			var to = index;
			if (this.Target >= middle){
				from = index;
				to = this.diagramData.nodeDataArray.length;
			}
			for(var i = from; i < to; i++)
			{
				this.ChangeColor(this.diagramData.nodeDataArray[i].key, time++, "red");
				if (this.diagramData.nodeDataArray[i].value == this.Target) {
					this.Output = i;
					return;
				}
			}
			return this.Output = "Not Found";	
		},
		FindPeak() {
			var time = 1;
			var left = 0;
			var right = this.diagramData.nodeDataArray.length - 1;
			while (left < right){
				var mid = parseInt((left + (right - left) / 2));
				this.ChangeColor(this.diagramData.nodeDataArray[mid].key, time, "red")
				this.ChangeColor(this.diagramData.nodeDataArray[mid + 1].key, time++, "yellow")
				if (this.diagramData.nodeDataArray[mid].value < this.diagramData.nodeDataArray[mid + 1].value)
					left = mid + 1;
				else 
					right = mid;
			}
			this.ChangeColor(this.diagramData.nodeDataArray[left].key, time, "red")
			this.Output = left;
		},
		SearchRange() {
			var time = 1;
			var left = 0;
			var right = this.diagramData.nodeDataArray.length - 1;
			var found=false;
			var pos = 0;
			var result = [-1,-1];
			while( left <= right){
				var mid = parseInt((left + (right - left) / 2));
				this.ChangeColor(this.diagramData.nodeDataArray[mid].key, time++, "red")
				if(this.diagramData.nodeDataArray[mid].value > this.Target)
					right = mid - 1;
				else if(this.diagramData.nodeDataArray[mid].value < this.Target)
					left = mid + 1;
				else{
					pos = mid;
					found = true;
					break;
				}
			}
			if(found == false){
				this.Output = '[-1, -1]';
			} else {
				left = pos;
				right = this.diagramData.nodeDataArray.length - 1;
				while(left < right - 1){
					var mid = parseInt((left + (right - left) / 2));
					this.ChangeColor(this.diagramData.nodeDataArray[mid].key, time++, "red")
					if(this.diagramData.nodeDataArray[mid].value == this.Target){
						result[1] = mid;
						left = mid;
					}else if(this.diagramData.nodeDataArray[mid].value < this.Target)
						left = mid;
					else
						right = mid;
				}
				if(this.diagramData.nodeDataArray[left].value == this.Target)
					result[1] = left;
				if(this.diagramData.nodeDataArray[right.value ]== this.Target)
					result[1] = right;
				right = pos;
				left = 0;
				while(left < right - 1){
					var mid = parseInt((left + (right - left) / 2));
					this.ChangeColor(this.diagramData.nodeDataArray[mid].key, time++, "red")
					if(this.diagramData.nodeDataArray[mid].value == this.Target){
						result [0] = mid;
						right = mid;
					}else if(this.diagramData.nodeDataArray[mid].value > this.Target)
						right = mid;
					else
						left = mid;
				}
				if(this.diagramData.nodeDataArray[right].value == this.Target)
					result[0] = right;
				if(this.diagramData.nodeDataArray[left].value == this.Target)
					result[0] = left;
			}
			this.Output = result;
		},
		TwoSum() {
			var time = 1;
			var n = this.diagramData.nodeDataArray.length;
			var left = 0;
			var right = n - 1;

			while (left < right) {
				var result = this.diagramData.nodeDataArray[left].value + this.diagramData.nodeDataArray[right].value;
				this.ChangeColor(this.diagramData.nodeDataArray[left].key, time, "red")
				this.ChangeColor(this.diagramData.nodeDataArray[right].key, time++, "yellow")
				if (result == this.Target) {
					this.Output = [left + 1, right + 1 ];
					return;
				} else if (result < this.Target) {
					left++;
				} else {
					right--;
				}
			}
			return this.Output = 'Sum not found';
		}
	}
}
</script>