var piecesArray = document.getElementsByClassName("piece");
var gameID = document.getElementsByClassName("gameid");
console.log(gameID[0].getAttribute("gameid"));
Array.from(piecesArray).forEach(function(element) {
  element.addEventListener("click", element => {
    var game_piece_id = element.getAttribute("pieceid");




    console.log(element.target);
  });
});

// var piecesList = document.querySelectorAll('.piece');
// for(i = 0; i < piecesList.length; i++){
//   piecesList[0].addEventListener("click", )
// }
 