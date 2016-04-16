var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketioJwt   = require("socketio-jwt");

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

io
  .on('connection', socketioJwt.authorize({
    secret: '8',
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', function(socket) {
    //this socket is authenticated, we are good to handle more events from it.
    console.log('hello! ' + JSON.stringify(socket.decoded_token));
  socket.on('chat message', function(msg){
    console.log('message from '+ socket.decoded_token.uid  + ' ' + msg);
    });
  });
