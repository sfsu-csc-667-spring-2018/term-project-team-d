  // initializing socket, connection to server
  //var socket = io.connect('https://csc-667-team-f.herokuapp.com:7777');
  const socket = io.connect('//localhost:3000');
  socket.on('connect', function(data) {
    socket.emit('join', 'Hello server from client');
  });

  // listener for 'thread' event, which updates messages
  socket.on('thread', function(data) {
    $('#thread').append('<li>' + data + '</li>');
  });

  // prevents form from submitting and sends a message to server
  $('#chat').submit(function(){
    var message = $('#message').val();
    socket.emit('messages', message);
    this.reset();
    return false;
  });