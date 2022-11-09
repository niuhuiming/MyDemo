<template>
  <div id="app" class="container">
    <div class="gift">中奖啦</div>
    <canvas ref="canvas" @pointerdown="startPainting" @pointerup="finishPainting" @pointermove="paiting"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      stroke: '#000000',
      lineWidth: 50,
      isPainting: false
    };
  },
  methods: {
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    startPainting() {
      this.isPainting = true;
      this.ctx.beginPath(); // 结束上一步绘画
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
      this.getProgress();
    },
    coverInit() {
      this.ctx.fillStyle = '#8e9aaf';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = 'bold 100px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = '#ffe1a8';
      this.ctx.fillText('刮一刮', this.canvas.width / 2, this.canvas.height / 2);
    },
    getProgress() {
      const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
      let pointNum = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        if (imageData[i + 3] === 0) {
          pointNum++;
        }
      }
      const progress = pointNum / (this.canvas.width * this.canvas.height);
      // 空白占 1/2 就将画布清除
      if (progress > .5) {
        this.clear();
      }
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    const canvasContainerRect = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext('2d');
    this.canvasOffsetX = canvasContainerRect.left;
    this.canvasOffsetY = canvasContainerRect.top;
    this.canvas.width = window.innerWidth - this.canvasOffsetX;
    this.canvas.height = window.innerHeight / 2 - this.canvasOffsetY;
    this.coverInit();
    this.ctx.globalCompositeOperation = 'destination-out';
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

.gift {
  font: italic bold 40px arial verdana;
  color: rgb(169, 18, 18);
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  position: absolute;
  top: 0;
}
</style>