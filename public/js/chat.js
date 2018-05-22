  // initializing socket, connection to server
  const socket = io('/chat-namespace');
  socket.on('connect', function(data) {
    socket.emit('join', 'Hello server from client');
  });

  // listener for 'thread' event, which updates messages
  socket.on('thread', function(data) {
    $('#thread').append('<li>' + data + '</li>');
    var element = document.getElementById('thread');
    element.scrollTop = element.scrollHeight;
  });

  // prevents form from submitting and sends a message to server
  $('#chat').submit(function(){
    var message = $('#message').val();
    if(message != ""){
      var username = $('#user').text();
      var full_message = username + ': ' + message;
      socket.emit('messages', full_message);
      this.reset();}
    return false;
 });

  $('#joinBtn').click(function(){
    console.log("*********" + $('#gameToJoin').val());
    var action = '/game/' +  $('#gameToJoin').val();
    document.getElementById('join').action = action;
    $('#join').submit();
  })