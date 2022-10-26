## 09 chatroom

#### 为什么需要websocket

因为http协议有一个缺陷：通信只能由客户端发起。这种单向请求就注定了如果服务器有连续的的状态变化，客户端要获知就非常麻烦，我们只能使用轮询，每隔一段时间了解服务器有没有新消息，最典型的运用场景就是聊天室。

轮询的效率低，浪费资源，websocket就是在这种背景下发明的

#### 简介

它的最大特点，就是服务器可以向客户端推送消息，客户端也可以主动向服务器发送消息，是真正双向的平等对话，属于服务器推送技术的一种。

其他特点包括：

1. 建立在TCP协议上，服务器端的实现比较容易
2. 与HTTP协议有着良好的兼容性，默认端口是80和443，并且握手阶段采用HTTP协议，因此握手时不容易屏蔽，能通过各种HTTP代理服务器
3. 数据格式比较轻量，性能开销小，通信高效
4. 可以发送文本，也可以发送二进制数据
5. 没有同源限制，客户端可以与任意服务器通信
6. 协议标识符是ws，如果加密，则为wss，服务器网址就是URL

<img src="../imgs/9_01.jpg" style="zoom: 67%;" />

#### 客户端API

1. websocket构造函数

   ```js
   var ws = new WebSocket('ws://localhost:8080');
   ```

   执行上面的语句后，客户端就会与服务器进行连接，

2. websocket.readyState

   readyState属性返回实例对象的当前状态，共有四种：

   CONNECTING：值为0，表示正在连接。
   OPEN：值为1，表示连接成功，可以通信了。
   CLOSING：值为2，表示连接正在关闭。
   CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

3. webSocket.onopen

   实例对象的onopen属性，用于指定连接成功后的回调函数

   ```js
   ws.addEventListener('open', function (event) {
     ws.send('Hello Server!');
   });
   ```

4. webSocket.onclose

   实例对象的onclose属性，用于指定连接关闭后的回调函数

   ```js
   ws.addEventListener("close", function(event) {
     var code = event.code;
     var reason = event.reason;
     var wasClean = event.wasClean;
     // handle close event
   });
   ```

5. webSocket.onmessage

   实例对象的onmessage属性，用于指定收到服务器数据后的回调函数

   ```js
   ws.addEventListener("message", function(event) {
     var data = event.data;
     // 处理数据
   });
   ```

   服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）

   ```js
   ws.onmessage = function(event){
     if(typeof event.data === String) {
       console.log("Received data string");
     }
   
     if(event.data instanceof ArrayBuffer){
       var buffer = event.data;
       console.log("Received arraybuffer");
     }
   }
   ```

6. webSocket.send

   实例对象的send方法用于向服务器发送数据

   ```js
   ws.send('your message');
   ```

7. webSocket.bufferedAmount

   实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束

   ```js
   var data = new ArrayBuffer(10000000);
   socket.send(data);
   
   if (socket.bufferedAmount === 0) {
     // 发送完毕
   } else {
     // 发送还没结束
   }
   ```

8. webSocket.onerror

   实例对象的onerror属性，用于指定报错时的回调函数

   ```js
   socket.addEventListener("error", function(event) {
     // handle error event
   });
   ```

#### 服务端实现

常用的Node实现有三种：

1. µWebSockets
2. Socket.IO
3. WebSocket-Node

#### 本项目简介

使用方法：在终端`node server.js`，在浏览器中打开`http://127.0.0.1:3000/`，在一个页面发送消息的时候，其他页面也能接收到相应

websocket的简单应用，还是监听事件、根据事件执行回调