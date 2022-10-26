const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', socket => {
  console.log('有人进入了聊天室');
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  })
  socket.on('disconnect', () => {
    console.log('有人离开了');
  })
})

server.listen('3000', () => {
  console.log('服务器开启');
});