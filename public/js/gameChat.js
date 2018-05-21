  // initializing socket, connection to server
  const gameChatSocket = io('/gameChatSocket');
  gameChatSocket.on('connect', function(data) {
    gameChatSocket.emit('join', 'Hello server from game chat');
  });

  // listener for 'thread' event, which updates messages
  gameChatSocket.on('thread', function(data) {
    $('#thread').append('<li>' + data + '</li>');
    var element = document.getElementById('thread');
    element.scrollTop = element.scrollHeight;
  });

  // prevents form from submitting and sends a message to server
  $('#gameChat').submit(function(){
    var message = $('#message').val();
    if(message != ""){
      var username = $('#user').text();
      var full_message = username + ': ' + message;
      gameChatSocket.emit('messages', full_message);
      this.reset();}
    return false;
 });