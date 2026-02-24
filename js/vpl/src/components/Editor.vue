<template>
  <div class="editor-shell">
    <svg
      ref="svgRef"
      class="editor-canvas"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" class="edge-arrow" />
        </marker>
      </defs>

      <rect
        class="canvas-hit"
        width="100%"
        height="100%"
        @dblclick="handleCanvasDblClick"
      />

      <g class="edges">
        <line
          v-for="edge in edges"
          :key="edge.id"
          class="edge-line"
          :x1="getConnectorPosition(edge.from, 'out').x"
          :y1="getConnectorPosition(edge.from, 'out').y"
          :x2="getConnectorPosition(edge.to, 'in').x"
          :y2="getConnectorPosition(edge.to, 'in').y"
          marker-end="url(#arrow)"
        />
        <line
          v-if="connectingFromId"
          class="edge-line preview"
          :x1="getConnectorPosition(connectingFromId, 'out').x"
          :y1="getConnectorPosition(connectingFromId, 'out').y"
          :x2="pointerPosition.x"
          :y2="pointerPosition.y"
        />
      </g>

      <g class="nodes">
        <g
          v-for="node in nodes"
          :key="node.id"
          class="node"
          :transform="`translate(${node.x} ${node.y})`"
        >
          <rect
            class="node-body"
            :width="node.width"
            :height="node.height"
            rx="8"
            ry="8"
            @pointerdown="startDrag(node, $event)"
            @dblclick.stop="beginEditing(node)"
          />

          <circle
            class="connector input"
            :cx="node.width / 2"
            cy="-10"
            r="6"
            @pointerup.stop="finishConnection(node)"
          />
          <circle
            class="connector output"
            :cx="node.width / 2"
            :cy="node.height + 10"
            r="6"
            @pointerdown.stop="startConnection(node, $event)"
          />

          <foreignObject
            v-if="editingNodeId === node.id"
            :x="10"
            :y="node.height / 2 - 14"
            :width="node.width - 20"
            height="28"
          >
            <input
              ref="editInputRef"
              v-model="editingText"
              class="node-input"
              @keydown.enter.prevent="commitEdit"
              @blur="commitEdit"
            />
          </foreignObject>
          <text
            v-else
            class="node-label"
            :x="node.width / 2"
            :y="node.height / 2"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            {{ node.text }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { nextTick } from 'vue';

export default {
  name: 'Editor',
  data() {
    return {
      nodes: [],
      edges: [],
      editingNodeId: null,
      editingText: '',
      connectingFromId: null,
      pointerPosition: { x: 0, y: 0 },
      dragState: null,
      defaultNodeSize: {
        width: 180,
        height: 80,
      },
    };
  },
  methods: {
    toCanvasPoint(event) {
      const svg = this.$refs.svgRef;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    createNode(point) {
      const id = `node-${Date.now()}-${Math.round(Math.random() * 10000)}`;
      const node = {
        id,
        x: Math.max(20, point.x - this.defaultNodeSize.width / 2),
        y: Math.max(20, point.y - this.defaultNodeSize.height / 2),
        width: this.defaultNodeSize.width,
        height: this.defaultNodeSize.height,
        text: 'New Node',
      };
      this.nodes.push(node);
      this.beginEditing(node, true);
    },
    handleCanvasDblClick(event) {
      const point = this.toCanvasPoint(event);
      this.createNode(point);
    },
    beginEditing(node, replaceText = false) {
      this.editingNodeId = node.id;
      this.editingText = replaceText ? '' : node.text;
      nextTick(() => {
        const input = this.$refs.editInputRef;
        if (!input) return;
        input.focus();
        input.select();
      });
    },
    commitEdit() {
      if (!this.editingNodeId) return;
      const node = this.nodes.find((item) => item.id === this.editingNodeId);
      if (node) {
        const trimmed = this.editingText.trim();
        node.text = trimmed.length > 0 ? trimmed : 'Untitled';
      }
      this.editingNodeId = null;
      this.editingText = '';
    },
    startDrag(node, event) {
      if (this.editingNodeId === node.id) return;
      const point = this.toCanvasPoint(event);
      this.dragState = {
        nodeId: node.id,
        offsetX: point.x - node.x,
        offsetY: point.y - node.y,
      };
      event.target.setPointerCapture(event.pointerId);
    },
    onPointerMove(event) {
      const point = this.toCanvasPoint(event);
      this.pointerPosition = point;
      if (!this.dragState) return;
      const node = this.nodes.find((item) => item.id === this.dragState.nodeId);
      if (!node) return;
      node.x = Math.max(20, point.x - this.dragState.offsetX);
      node.y = Math.max(20, point.y - this.dragState.offsetY);
    },
    onPointerUp() {
      this.dragState = null;
      this.connectingFromId = null;
    },
    startConnection(node, event) {
      this.connectingFromId = node.id;
      this.pointerPosition = this.toCanvasPoint(event);
    },
    finishConnection(node) {
      if (!this.connectingFromId || this.connectingFromId === node.id) {
        this.connectingFromId = null;
        return;
      }
      const id = `edge-${Date.now()}-${Math.round(Math.random() * 10000)}`;
      this.edges.push({ id, from: this.connectingFromId, to: node.id });
      this.connectingFromId = null;
    },
    getConnectorPosition(nodeId, type) {
      const node = this.nodes.find((item) => item.id === nodeId);
      if (!node) return { x: 0, y: 0 };
      if (type === 'in') {
        return { x: node.x + node.width / 2, y: node.y - 10 };
      }
      return { x: node.x + node.width / 2, y: node.y + node.height + 10 };
    },
  },
};
</script>

<style scoped>
.editor-shell {
  height: 100vh;
  width: 100%;
  background: radial-gradient(circle at 10% 10%, #f3f2e8, #d5e2e9 55%, #f5f1de);
}

.editor-canvas {
  height: 100%;
  width: 100%;
  display: block;
}

.canvas-hit {
  fill: transparent;
}

.node-body {
  fill: #ffffff;
  stroke: #2a4b4f;
  stroke-width: 2;
  cursor: grab;
}

.node-body:active {
  cursor: grabbing;
}

.node-label {
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  fill: #1f2b33;
  pointer-events: none;
}

.connector {
  fill: #f4b23f;
  stroke: #1f2b33;
  stroke-width: 2;
}

.connector.input {
  fill: #73c7a0;
}

.edge-line {
  stroke: #1f2b33;
  stroke-width: 2;
  fill: none;
}

.edge-line.preview {
  stroke-dasharray: 6 6;
}

.edge-arrow {
  fill: #1f2b33;
}

.node-input {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 1px solid #2a4b4f;
  padding: 0 8px;
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  box-sizing: border-box;
  background: #fffaf0;
}
</style>