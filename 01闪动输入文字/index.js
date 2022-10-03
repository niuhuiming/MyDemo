function blinkPrint(str) {
  // 获取outer容器
  const outer = document.getElementsByClassName('outer')[0];
  // 对每一个字符生成新的span并插入到页面中
  for (let i = 0; i < str.length; i++) {
    setTimeout(function () {
      const span = document.createElement("span");
      // 特判换行、空格、制表符
      if (str[i] == '\n') {
        span.innerHTML = '<br/>';
      } else if (str[i] == ' ') {
        span.innerHTML = '&nbsp;';
      } else if (str[i] == '\t') {
        span.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
      } else {
        const textnode = document.createTextNode(str[i]);
        span.appendChild(textnode);
      }
      span.classList.add("word", `color${Math.floor(Math.random() * 12) + 1}`);
      // 空格也会占用空间，这里insertBefore的位置要注意一下
      outer.insertBefore(span, outer.childNodes[outer.childNodes.length - 3]);
    }, 200 * i);
  }
}
