## 14URLToPDF

#### 使用方法

1. node index.js
2. 访问vscode的url
3. 查看pdf文件夹下的pdf
4. 修改浏览器url参数，生成其他pdf

#### 简介

puppeteer.launch：启动一个浏览器

page：新建一个页面

page.goto：在页面中打开一个网址，等待load事件触发

page.pdf：调用浏览器的打印功能

browser.close()：关闭浏览器