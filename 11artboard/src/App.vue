<template>
  <div id="app" class="container">
    <div id="toolbar">
      <h1>画板 🖌️</h1>
      <label for="stroke">画笔颜色</label>
      <input id='stroke' type="color" v-model="stroke">
      <label for="lineWidth">画笔大小</label>
      <input id='lineWidth' type="number" v-model="lineWidth">
      <button @click="clear">清除</button>
    </div>
    <div>
      <canvas ref="canvas" @pointerdown="startPainting" @pointerup="finishPainting" @pointermove="paiting"></canvas>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      isPainting: false,
      lineWidth: 5,
      canvasOffsetX: 0,
      canvasOffsetY: 0,
      startX: 0,
      startY: 0,
      stroke: '#000000'
    };
  },
  watch: {
    stroke(newStroke) {
      this.ctx.strokeStyle = newStroke;
    }
  },
  methods: {
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    startPainting(e) {
      this.isPainting = true;
      this.ctx.beginPath(); // 结束上一步绘画
      this.paiting(e);
    },
    finishPainting() {
      this.isPainting = false;
    },
    paiting(e) {
      if (!this.isPainting) {
        return;
      }
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.lineCap = 'round';
      this.ctx.lineTo(e.clientX - this.canvasOffsetX, e.clientY);
      this.ctx.stroke();
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    const canvasContainerRect = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext('2d');
    this.canvasOffsetX = canvasContainerRect.left;
    this.canvasOffsetY = canvasContainerRect.top;
    this.canvas.width = window.innerWidth - this.canvasOffsetX;
    this.canvas.height = window.innerHeight - this.canvasOffsetY;
  }
};
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

h1 {
  color: #a8dadc;
}

.container {
  height: 100%;
  display: flex;
}

#toolbar {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 150px;
  color: #f1faee;
  background: #22223b;
}

#toolbar * {
  margin-bottom: 15px;
}

#toolbar label {
  font-size: 16px;
}

#toolbar input {
  width: 90%;
}

#toolbar button {
  width: 90%;
  background-color: #1565c0;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 10px 0;
}
</style>