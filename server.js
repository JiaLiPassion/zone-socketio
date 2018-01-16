const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');

function handler (req, res) {
  console.log('path', req.url);
  const path = req.url === '/' ? '/index.html': req.url;
  fs.readFile(__dirname + path,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(8086);
