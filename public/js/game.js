var piecesArray = document.getElementsByClassName("piece");
var cellArray = document.getElementsByClassName("cell");
var gameID = document.getElementsByClassName("gameid");


var currentX;
var currentY;
var piece;
var firstClick = true;


Array.from(cellArray).forEach(function(cell){
  cell.addEventListener("click", getPosition ,false);
});

Array.from(piecesArray).forEach(function(piece){
  piece.addEventListener("click", getPosition, false);
})

var getPosition = function(item){
  if(firstClick){
    currentX = item.target.getAttribute('col');
    currentY = item.target.getAttribute('row');
    firstClick = false;
    piece = item;
    item.stopPropagation();
  }else{
    var destinationX = item.target.getAttribute('col');
    var destinationY = item.target.getAttribute('row');
    update(piece, currentX, currentY, destinationX, destinationY);
    firstClick = true;
  }
}

function update(piece, currentX, currentY, destinationX, destinationY){
  // console.log("IN GAME.JS!!!!!!!!!!!!!!!!!!")
  // console.log(playerID)
  var pieceID = piece.target.getAttribute('pieceID');
  var pieceType = piece.target.getAttribute('piecetype');
  var pieceColor = piece.target.getAttribute('piececolor');
  var gameid = gameID[0].getAttribute('gameid');
  var playerID = piece.target.getAttribute("playerID");
  var bodyString = (JSON.stringify({
      pieceID,
      pieceType,
      pieceColor,
      playerID,
      currentX,
      currentY,
      destinationX,
      destinationY
    }));

  fetch('/game/' + gameid + '/move',{
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: bodyString,
  }).catch(function(err){
    console.log(err);
  });

  // const socket = io('/game/${gameID}').
  // socket.on('update', game =>{
  //   //update UI
  // })
}