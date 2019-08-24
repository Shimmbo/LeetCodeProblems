<template>
    
</template>

<script>

const go = require('gojs')
// Lo declaramos globalmente
var $ = go.GraphObject.make;

export default {
	name: 'ArrayDiagram',
    props: ['modelData'],
    mounted: function() {
        var self = this;
        var myDiagram =
        $(go.Diagram, this.$el,
        {
            allowDragOut:false,
            allowDrop : false,
            allowSelect: false,
            allowLink: false,
            allowMove: false,
            allowRotate: false,
            layout: $(go.TreeLayout, { angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal }),
            "undoManager.isEnabled": false,
            // Model ChangedEvents get passed up to component users
            "ModelChanged": function(e) { self.$emit("model-changed", e); },
            "ChangedSelection": function(e) { self.$emit("changed-selection", e); }
        });

        myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape,
            {
                fill: "white", strokeWidth: 0,
                portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer",
            },
            new go.Binding("fill", "color")),
            $(go.TextBlock,
            { margin: 8, editable: true },
            new go.Binding("text").makeTwoWay())
        );

        myDiagram.linkTemplate =
        $(go.Link,
            { relinkableFrom: true, relinkableTo: true },
            $(go.Shape),
            $(go.Shape, { toArrow: "OpenTriangle" })
        );
        myDiagram.div.style.background = "#e9ecef";
        myDiagram.div.style.height = "200px";
        myDiagram.div.style.width = "50%";
        this.diagram = myDiagram;

        this.updateModel(this.modelData);
    },
    watch: {
        modelData: function(val) { this.updateModel(val); }
    },
    methods: {
        model: function() { return this.diagram.model; },
        updateModel: function(val) {
        // No GoJS transaction permitted when replacing Diagram.model.
        if (val instanceof go.Model) {
            this.diagram.model = val;
        } else {
            var m = new go.GraphLinksModel()
            if (val) {
            for (var p in val) {
                m[p] = val[p];
            }
            }
            this.diagram.model = m;
        }
        },
        updateDiagramFromData: function() {
            this.diagram.startTransaction();
            this.diagram.updateAllRelationshipsFromData();
            this.diagram.updateAllTargetBindings();
            this.diagram.commitTransaction("updated");
        },
        setContentAlign() {
            this.diagram.startTransaction();
            this.diagram.contentAlignment  = go.Spot.Center;
            this.diagram.commitTransaction("Left");
        }
    }
}
</script>
