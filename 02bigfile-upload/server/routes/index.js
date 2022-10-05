const router = require('koa-router')()
const koaBody = require('koa-body')
const fs = require('fs')
const path = require('path')
const outPutPath = path.join(__dirname, '/upload')

router.post('/upload', koaBody({
  multipart: true,  // 可以处理formdata数据
  formidable: {
    uploadDir: outPutPath, // 文件将要存放的位置
    onFileBegin(name, file) {
      const [filename, fileHash, index] = name.split('-')
      const dir = path.join(outPutPath, filename)
      // 检测是否存在dir这个目录
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
      // 修改上传文件存放位置
      file.filepath = `${dir}/${fileHash}-${index}`
    },
    onError() {
      console.warn('上传失败了');
    }
  }
}), async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/mergeChunk', async (ctx, next) => {
  const { filename, size } = ctx.request.body;
  // 合并操作
  await mergeChunks(filename, size);
  ctx.body = {
    title: 'koa2 json'
  }
})

function mergeChunks(filename, size) {
  // 读文件的流
  const readPath = path.join(outPutPath, filename)
  const chunkList = fs.readdirSync(readPath);
  if (!chunkList.length) {
    return
  }
  // 对分块进行排序
  chunkList.sort((a, b) => a.split('-')[1] - b.split('-')[1]);

  let count = 0;
  let length = chunkList.length;

  chunkList.forEach((chunkPath, index) => {
    // 读取流
    const readStream = fs.createReadStream(path.resolve(readPath, chunkPath));
    // 写入流
    const writeStream = fs.createWriteStream(path.join(outPutPath, '_' + filename), {
      start: index * size,
      end: (index + 1) * size
    })
    readStream.pipe(writeStream);
    readStream.on('end', () => {
      // 删掉读取完成的分块
      fs.unlinkSync(path.resolve(readPath, chunkPath));
      count++;
      // 所有块完成
      if (count >= length) {
        setTimeout(() => {
          fs.rmdirSync(readPath)
        })
      }
    })
  })
}

module.exports = router
