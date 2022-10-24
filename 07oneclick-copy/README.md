# 07oneclick-copy

### execCommand

在过去，实现一键复制功能只能使用 `document.execCommand` 来操作剪贴板。不过，这种操作是同步的，并且只能读取和写入dom。目前已被废弃。

`document.execCommand`的历史：IE独有的，其他浏览器对IE浏览器的兼容，但未是形成标准，并且会有安全问题，因此被废弃

### clipboard

现在Chrome66已经支持了新的 `Async Clipboard API`，作为 `execCommand` 替代品。

##### 复制：将文本写入剪贴板

`writeText()` 可以把文本写入剪切板。`writeText()` 是异步的，它返回一个 Promise

```js
navigator.clipboard.writeText('要复制的文本')
  .then(() => {
    console.log('文本已经成功复制到剪切板');
  })
  .catch(err => {
    // This can happen if the user denies clipboard permissions:
    // 如果用户没有授权，则抛出异常
    console.error('无法复制此文本：', err);
  });
```

还可以使用异步的async和await

```js
async function copyPageUrl() {
  try {
    await navigator.clipboard.writeText(location.href);
    console.log('Page URL copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
```

##### 粘贴：从剪贴板中读取文本

和复制一样，可以通过调用 `readText()` 从剪贴板中读取文本，该函数也返回一个 Promise

```js
navigator.clipboard.readText()
  .then(text => {
    console.log('Pasted content: ', text);
  })
  .catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });
```

```js
async function getClipboardContents() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}
```

##### 处理粘贴事件

有计划推出检测剪贴板更改的新事件，但现在最好使用“粘贴”事件。它很适合用于阅读剪贴板文本的新异步方法：

```js
document.addEventListener('paste', event => {
  event.preventDefault();
  navigator.clipboard.readText().then(text => {
    console.log('Pasted text: ', text);
  });
});
```

