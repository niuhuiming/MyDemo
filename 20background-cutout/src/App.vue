<template>
  <div id="app">
    <video src="./assets/girl.mp4" ref="video" width="800" height="450" muted loop
      autoplay></video>
    <div class="output">
      <span class="bg"></span>
      <canvas ref="canvas" width="800" height="450"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    init() {
      this.video = this.$refs.video;
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      // 视频流 → 临时画布 → 输出画布
      this.canvasTmp = document.createElement('canvas');
      this.canvasTmp.width = this.video.width;
      this.canvasTmp.height = this.video.height;
      this.ctxTmp = this.canvasTmp.getContext('2d');
      this.video.crossOrigin = 'anonymous';
    },
    animate() {
      this.ctxTmp.drawImage(this.video, 0, 0, this.video.width, this.video.height);
      const frame = this.ctxTmp.getImageData(0, 0, this.video.width, this.video.height);
      // 处理数据
      this.model.segmentPerson(this.canvasTmp, { segmentationThreshold: 0.9 }).then(segmentation => {
        for (let i = 0; i < segmentation.data.length; i++) {
          if (segmentation.data[i] === 0) {
            frame.data[i * 4 + 3] = 0;
          }
        }
        this.ctx.putImageData(frame, 0, 0);
        requestAnimationFrame(this.animate);
      })
    }
  },
  mounted() {
    this.init();
    window.bodyPix.load().then(model => {
      this.model = model;
      this.animate();
    });
  }
};
</script>
<style>
.output {
  position: relative;
  width: 800px;
  height: 450px;
}

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("./assets/scenery.jpeg");
  background-size: cover;
}

canvas {
  position: relative;
}
</style>