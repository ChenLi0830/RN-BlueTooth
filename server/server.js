'use strict';

const express = require('express');

let app = express();
let server = require('http').createServer(app);
const io = require('socket.io')(server);
// const io = require('socket.io')(app);
const fs = require('fs');

app.get('/', (req, res) => {
  // res.send("You reached local server hosted by Chen's Macbook");
  res.send("You reached the server's root");
  // socket.emit('my other event', { my: 'data' });
});

app.get('/bt/start', (req, res) => {
  io.sockets.emit('/bt/start');
  res.send('Blue Tooth Start');
});

app.get('/bt/stop', (req, res) => {
  io.sockets.emit('/bt/stop');
  res.send('Blue Tooth Stop');
});

app.get('/wifi/start', (req, res) => {
  io.sockets.emit('/wifi/start');
  res.send('Wifi Start');
});

app.get('/wifi/stop', (req, res) => {
  io.sockets.emit('/wifi/stop');
  res.send('Wifi Stop');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('bleList', (list) => {
    console.log("start to write to bleList.txt - list", list);
    list.forEach(device => fs.appendFile('bleList.txt', JSON.stringify(device)+'\n'));
    // fs.appendFile('bleList.txt', JSON.stringify(list), function (err) {
    //
    // });
  });
  
  socket.on('wifiList', () => {
    console.log("start to write to wifiList.txt");
    fs.appendFile('wifiList.txt', 'wifi data to append\n', function (err) {
      
    });
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('app listening on port 3000!')
});

