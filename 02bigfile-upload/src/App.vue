<template>
  <div id="app">
    <input type="file" @change="getFile" name="" id="">
    <div v-for="(chunk, index) in chunkList" :key="index">
      <div>{{chunk.name + "===" + index}}</div>
      <!-- 进度条 -->
      <input type="range" :value="chunk.percentage">
    </div>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5';
import { uploadFile, mergeChunks } from './request';

export default {
  name: 'App',
  data() {
    return {
      currFile: {}, // 当前选择的文件
      defaultChunkSize: 100 * 1024 * 1024,  // 100M
      chunkList: []
    }
  },
  methods: {
    async getFile(e) {
      // 获取文件
      this.currFile = e.target.files[0];
      // 对大文件进行分块
      let fileHash = await this.getFileChunks(this.currFile, this.defaultChunkSize);
      // 上传分块
      this.uploadChunk(fileHash);
    },
    // 文件切块
    getFileChunks(file, chunkSize) {
      const that = this;
      return new Promise((resolve) => {
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        let spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();

        fileReader.onload = function (e) {
          const chunk = e.target.result;
          spark.append(chunk);
          currentChunk++;
          if (currentChunk >= chunks) {
            const fileHash = spark.end();
            resolve(fileHash);
          } else {
            loadNext();
          }
        }

        fileReader.onerror = function () {
          console.warn('失败了');
        }

        function loadNext() {
          const start = currentChunk * chunkSize;
          const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
          const chunk = blobSlice.call(file, start, end);
          that.chunkList.push({
            chunk,
            size: chunk.size,
            name: that.currFile.name,
            percentage: 0
          })
          fileReader.readAsArrayBuffer(chunk);
        }
        loadNext();
      })
    },
    uploadChunk(fileHash) {
      const that = this;

      const requests = this.chunkList.map((item, index) => {
        const formData = new FormData();
        formData.append(
          `${this.currFile.name}-${fileHash}-${index}`,
          item.chunk
        )
        return uploadFile('upload', formData, that.onUploadProgress(item));
      })
      Promise.all(requests).then(() => {
        // 合并
        mergeChunks('mergeChunk', {
          size: this.defaultChunkSize,
          filename: this.currFile.name
        })
      })
    },
    onUploadProgress(item) {
      return function (e) {
        item.percentage = parseInt(String(e.loaded / e.total) * 100)
      }
    }
  },
}
</script>