const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  // res.send("You reached local server hosted by Chen's Macbook");
  res.send("You reached the server's root");
  // socket.emit('my other event', { my: 'data' });
});

app.get('/bt/start', (req, res) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send('/bt/start');
    }
  });
  // ws.send();
  res.send('Blue Tooth Start');
});

// app.get('/bt/stop', (req, res) => {
//   ws.send('/bt/stop');
//   res.send('Blue Tooth Stop');
// });

wss.on('connection', function connection(ws) {
  console.log("a user is connected");
  // const location = url.parse(ws.upgradeReq.url, true);
  // console.log("connected, location", location);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  

  // app.get('/bt/start', (req, res) => {
  //   ws.send('/bt/start');
  //   res.send('Blue Tooth Start');
  // });
  //
  // app.get('/bt/stop', (req, res) => {
  //   ws.send('/bt/stop');
  //   res.send('Blue Tooth Stop');
  // });
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});