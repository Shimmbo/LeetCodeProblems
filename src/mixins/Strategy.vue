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
			Output: '',
			Input: '',
			Pattern: '',
			Time: 1
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
			return this[this.Algorithm]()
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
			this.Time = 1;
			var index = parseInt(this.diagramData.nodeDataArray.length / 2);
			var middle = this.diagramData.nodeDataArray[index].value;
			this.ChangeColor(this.diagramData.nodeDataArray[index].key, this.Time++, "red");
			var from = 0;
			var to = index;
			if (this.Target >= middle){
				from = index;
				to = this.diagramData.nodeDataArray.length;
			}
			for(var i = from; i < to; i++)
			{
				this.ChangeColor(this.diagramData.nodeDataArray[i].key, this.Time++, "red");
				if (this.diagramData.nodeDataArray[i].value == this.Target) {
					this.Output = i;
					return;
				}
			}
			return this.Output = "Not Found";	
		},
		FindPeak() {
			this.Time = 1;
			var left = 0;
			var right = this.diagramData.nodeDataArray.length - 1;
			while (left < right){
				var mid = parseInt((left + (right - left) / 2));
				this.ChangeColor(this.diagramData.nodeDataArray[mid].key, this.Time, "red")
				this.ChangeColor(this.diagramData.nodeDataArray[mid + 1].key, this.Time++, "red")
				if (this.diagramData.nodeDataArray[mid].value < this.diagramData.nodeDataArray[mid + 1].value)
					left = mid + 1;
				else 
					right = mid;
			}
			this.ChangeColor(this.diagramData.nodeDataArray[left].key, this.Time, "red")
			this.Output = left;
		},
		SearchRange() {
			this.Time = 1;
			var left = 0;
			var right = this.diagramData.nodeDataArray.length - 1;
			var found=false;
			var pos = 0;
			var result = [-1,-1];
			while( left <= right){
				var mid = parseInt((left + (right - left) / 2));
				this.ChangeColor(this.diagramData.nodeDataArray[mid].key, this.Time++, "red")
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
					this.ChangeColor(this.diagramData.nodeDataArray[mid].key, this.Time++, "red")
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
					this.ChangeColor(this.diagramData.nodeDataArray[mid].key, this.Time++, "red")
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
			this.Time = 1;
			var n = this.diagramData.nodeDataArray.length;
			var left = 0;
			var right = n - 1;

			while (left < right) {
				var result = this.diagramData.nodeDataArray[left].value + this.diagramData.nodeDataArray[right].value;
				this.ChangeColor(this.diagramData.nodeDataArray[left].key, this.Time, "red")
				this.ChangeColor(this.diagramData.nodeDataArray[right].key, this.Time++, "red")
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
		},
		MaximumDepth(){
			this.Time = 1;
			this.Output = this.MaximumDepthHelper(this.diagramData.nodeDataArray[0]);
		},
		MaximumDepthHelper(root) {
			if (root == null) {
		    	return 0;                                
			}
			this.ChangeColor(root.key, this.Time++, "red");
			var left = this.MaximumDepthHelper(root.left);
			var right = this.MaximumDepthHelper(root.right);	
			return Math.max(left, right) + 1;
		},	
		PathSum() {
			this.Time = 1;
			this.Output = this.PathSumHelper(this.diagramData.nodeDataArray[0], this.Target);
		},
		PathSumHelper(root, sum) {
			if (root == null)
				return false;

			this.ChangeColor(root.key, this.Time++, "red");
			sum -= root.value;
			if (sum < 0)
				this.ChangeColor(root.key, this.Time++, "white");
			if (root.left == null && root.right == null && sum == 0)
				return true;
			
			if (root.left != null && this.PathSumHelper(root.left, sum))
				return true;
			
			if (root.right != null && this.PathSumHelper(root.right, sum))
				return true;
			
			return false;
		},
		PreOrder() {
			this.Time = 1;
			this.Output = [];
			this.PreOrderHelper(this.diagramData.nodeDataArray[0]);

		},
		PreOrderHelper(root) {
			if(root != null){
				this.Output.push(root.value);
				this.ChangeColor(root.key, this.Time++, "red");
				this.PreOrderHelper(root.left);
				this.PreOrderHelper(root.right);
			}
		},
		InOrder() {
			this.Time = 1;
			this.Output = [];
			this.InOrderHelper(this.diagramData.nodeDataArray[0]);
		},
		InOrderHelper(root) {
			if(root != null) {
				this.InOrderHelper(root.left);
				this.Output.push(root.value);
				this.ChangeColor(root.key, this.Time++, "red");
				this.InOrderHelper(root.right);
			}
		},
		ValidTree() {
			this.Time = 1;
			this.Output = this.ValidTreeHelper(this.diagramData.nodeDataArray[0], -Infinity, Infinity);
		},
		ValidTreeHelper(root, min, max) {
			if (root == null) return true;
			this.ChangeColor(root.key, this.Time++, "red");
			if (min < root.value && root.value < max) {
				var leftResult = this.ValidTreeHelper(root.left, min, root.value);
				var rightResult = this.ValidTreeHelper(root.right, root.value, max);

				return leftResult && rightResult;
			}

        	return false;
		},
		SearchValue() {
			this.Time = 1;
			this.Output = [];
			this.SearchValueMapper(this.SearchValueHelper(this.diagramData.nodeDataArray[0]));
		},
		SearchValueMapper(root) {
			if (root == null) return null;
			this.Output.push(root.value);
			this.SearchValueMapper(root.left);
			this.SearchValueMapper(root.right);
		},
		SearchValueHelper(root) {
			if (root == null)
				return null;
				
			this.ChangeColor(root.key, this.Time++, "red");

			if (root.value == this.Target)
				return root;
			else if (root.value < this.Target)
				return this.SearchValueHelper(root.right);
			else
				return this.SearchValueHelper(root.left);
		}
	}
}
</script>