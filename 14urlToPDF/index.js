'use strict';
const puppeteer = require('puppeteer');
const fs = require('fs');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const app = new Koa();

app.use(bodyParser());

router.get('/api/createPdf', async ctx => {
  ctx.body = await run(ctx);
})
app.use(router.routes());

app.listen(3000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:3000/api/createPdf?filename=baidu&url=${encodeURIComponent('https://www.baidu.com/')}`);
  }
})

const run = async (ctx) => {
  const requestParams = ctx.query;
  const { url, filename } = requestParams;

  console.log(`######## Filename is: ${decodeURIComponent(filename)}`);
  const startTime = Date.now();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    ignoreHTTPSErrors: true
  });

  console.log('browser is ready');
  const page = await browser.newPage();
  console.log('page is ready');

  page.on('pageerror', err => {
    console.log('XXXXXXXX: ', err);
  })
  console.log('downloading..');
  await page.goto(decodeURIComponent(url), {
    waitUntil: ['load']
  })
  console.log('open page: ', Date.now() - startTime, decodeURIComponent(url));

  // 渲染完成
  await page.waitForSelector('img', { timeout: 0 });
  // 等待到网络空闲才会往下走
  await page.waitForNetworkIdle();
  console.log('find ok!');

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '80px', right: '30px', bottom: '60px', left: '30px'
    }
  });

  console.log('create pdf: ', Date.now() - startTime);
  await browser.close();
  const dname = decodeURIComponent(filename);
  fs.writeFileSync(`./pdf/${dname}.pdf`, pdf);
  return `http://127.0.0.1:5502/pdf/${filename}.pdf`;
}