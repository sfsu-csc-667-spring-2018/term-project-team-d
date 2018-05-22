const db = require("../index");
// const pieces = require("./pieces");

const updateDB = (destinationX, destinationY, pieceID) => {
  const query = "UPDATE game_pieces SET x=$1, y=$2 WHERE id=$3";
  return db.none(query, [destinationX, destinationY, pieceID])
  .catch(err =>{
    console.log("ERR IN updateDB");
    console.log(err);
  });
}

const attack = (destinationX, destinationY, playerID) =>{
  var query = "SELECT * FROM game_pieces WHERE x=$1 AND y=$2";
  return db.one(query, [destinationX, destinationY])
  .catch(err =>{
    console.log("ERR IN ATTACK")
    console.log(err)
  });
}

const legalWhitePawnMove = (currentX, currentY, destinationX, destinationY, playerID) =>{
  if (attack(destinationX, destinationY, playerID)){
    if( ( ( destinationX === currentX-1 ) || ( destinationX === currentX+1 ) ) && ( destinationY === currentY-1 ) ){
       return Promise.resolve(true);
    }
  }
  if(currentY === 7){
      if( ( (destinationY === (currentY-2)) || (destinationY === (currentY-1)) ) && (currentX === destinationX)){
        return Promise.resolve(true);
      }
    }
  else if ((destinationY === currentY-1) && (destinationX === currentX)){
        return Promise.resolve(true);
  }
  else{
      return Promise.resolve(false);
  }
}

const legalBlackPawnMove = (currentX, currentY, destinationX, destinationY, playerID) =>{

  if (attack(destinationX, destinationY, playerID)){
    if( ( ( destinationX === currentX-1 ) || ( destinationX === currentX+1 ) ) && ( destinationY === currentY+1 ) ){
       return Promise.resolve(true);
    }
  }
  if(currentY === 2){
      if( ( (destinationY === (currentY+2)) || (destinationY === (currentY+1)) ) && (currentX === destinationX)){
        return Promise.resolve(true);
      }
    }
  else if ((destinationY === currentY+1) && (destinationX === currentX)){
        return Promise.resolve(true);
  }
  else{
      return Promise.resolve(false);
  }
}

const movingVertical = (currentX, currentY, destinationX, destinationY) =>{
  return ( (currentX === destinationX) && (currentY != destinationY) ); 
}

const movingHorizontal = (currentX, currentY, destinationX, destinationY) =>{
  return ( ( currentY === destinationY ) && ( currentX != destinationX) );
}

const movingDiagonally = (currentX, currentY, destinationX, destinationY) =>{
  const xAbsolute = Math.abs(destinationX - currentX);
  const yAbsolite = Math.abs(destinationY - currentY);

  if( (currentX === destinationX) || (currentY === destinationY) ){
    return false;
  }

  if (xAbsolute != yAbsolite){
    return false;
  }

  return true;
}

const nothingInTheWayVeritcal = (currentX, currentY, destinationX, destinationY, pieceID) =>{
  var query = "SELECT * FROM game_pieces WHERE x=$1 AND id!=$2";

  return db.any(query, [destinationX, pieceID])
  .then(pieces =>{
    for (var i = 0; i < pieces.length; i++){
      if (currentY > destinationY){
        if ( (currentY > pieces[i].y) && (destinationY < pieces[i].y)){
          return Promise.resolve(false);
        }
      }
      else if (currentY < destinationY){
        if ((currentY < pieces[i].y) && (destinationY > pieces[i].y)){
          return Promise.resolve(false);
        }
      }
    }
    return Promise.resolve(true);
  })
  .catch(err =>{
    console.log(err, "!!!!!!!!!!!!!!!");
  });
}

const nothingInTheWayHorizontal = (currentX, currentY, destinationX, destinationY, pieceID) =>{
  var query = "SELECT * FROM game_pieces WHERE y=$1 AND id!=$2";
  var piecesInWay = null;

  return db.any(query, [destinationY, pieceID])
  .then(pieces =>{
    for( var i = 0; i < pieces.length; i++){
      if (currentX < destinationX){
        if ( ( currentX < pieces[i].x ) && ( destinationX > pieces[i].x ) ){
          return Promise.resolve(false);
        }
      }
      else if ( currentX > destinationX ){
        if ( ( currentX > pieces[i].x ) && ( destinationX < pieces[i].x ) ){
          return Promise.resolve(false);
        }
      }
    }
    return Promise.resolve(true);
  })
  .catch(err =>{
    console.log("ERR IN nothingInTheWayVeritcal");
    console.log(err);
  });
}


const nothingInTheWayDiagonally = (currentX, currentY, destinationX, destinationY, pieceID) =>{
  var query = "SELECT * FROM game_pieces WHERE (x BETWEEN $1 AND $2) AND (y BETWEEN $3 AND $4)";
  var firstX;
  var secondX;
  var firstY;
  var secondY;

  if (currentX < destinationX){
    firstX = currentX+1;
    secondX = destinationX-1;
    xIncrementer = 1;
  }
  else{
    firstX = destinationX+1;
    secondX = currentX-1;
    xIncrementer = -1;
  }

  if (currentY < destinationY){
    firstY = currentY+1;
    secondY = destinationY-1;
    yIncrementer = 1;
  }
  else{
    firstY = destinationY+1;
    secondY = currentY-1;
    yIncrementer = -1;
  }

  return db.any(query, [firstX, secondX, firstY, secondY])
  .then(pieces =>{
    if(pieces.length > 0){
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }).catch(err => {
    console.log(err)
    return Promise.resolve(false);
  });
}


const pawn = (currentX, currentY, destinationX, destinationY, pieceColor, pieceID, playerID) =>{

  if(pieceColor === "white"){
    return legalWhitePawnMove(currentX, currentY, destinationX, destinationY, playerID); 
  }
  else if (pieceColor === "black"){
    return legalBlackPawnMove(currentX, currentY, destinationX, destinationY, playerID);
  }else{
    return Promise.resolve(false);
  }
};

const knight = (currentX, currentY, destinationX, destinationY, pieceColor, pieceID, playerID) =>{
  var upDownOne = ((destinationY === currentY-1) || (destinationY === currentY+1))
  var upDownTwo = ((destinationY === currentY-2) || (destinationY === currentY+2))
  var leftRightOne = ((destinationX === currentX-1) || (destinationX === currentX+1))
  var leftRightTwo = ((destinationX === currentX-2) || (destinationX === currentX +2))

  if( (upDownOne && leftRightTwo) || (upDownTwo && leftRightOne) ){
    return Promise.resolve(true)
  }
  return Promise.resolve(false);
};
const rook = (currentX, currentY, destinationX, destinationY, pieceColor, pieceID, playerID) =>{
  if (movingVertical(currentX, currentY, destinationX, destinationY)){
    return nothingInTheWayVeritcal(currentX, currentY, destinationX, destinationY, pieceID)
    .then(nothingInTheWayVeritcal => {
      if (nothingInTheWayVeritcal){
        return Promise.resolve(true);
      }
      else{
        return Promise.resolve(false);
      }
    })
    .catch(err =>{
       console.log(err)
       return Promise.resolve(false);
    });
  }
  else if (movingHorizontal(currentX, currentY, destinationX, destinationY)){
    return nothingInTheWayHorizontal(currentX, currentY, destinationX, destinationY, pieceID)
    .then(nothingInTheWayHorizontal =>{
      if (nothingInTheWayHorizontal){
        return Promise.resolve(true);
      }
      else{
        return Promise.resolve(false);
      }
    })
    .catch(err => {
      console.log(err);
      return Promise.resolve(false);
    });
  }
  else{
    return Promise.resolve(false);
  }
};
const bishop = (currentX, currentY, destinationX, destinationY, pieceColor, pieceID, playerID) =>{
  if (movingDiagonally(currentX, currentY, destinationX, destinationY)){
    return nothingInTheWayDiagonally(currentX, currentY, destinationX, destinationY, pieceID)
    .then( nothingInTheWayDiagonally =>{
      if(nothingInTheWayDiagonally){
        return Promise.resolve(true);
      }
      else{
        return Promise.resolve(false);
      }
    })
    .catch(err =>{
      console.log(err);
      return Promise.resolve(false);
    });
  }
  else{
    return Promise.resolve(false);
  }
};

const queen = (currentX, currentY, destinationX, destinationY, pieceColor, pieceID, playerID) =>{
  if (movingHorizontal(currentX, currentY, destinationX, destinationY) || movingVertical(currentX, currentY, destinationX, destinationY)){
    return rook(currentX, currentY, destinationX, destinationY, pieceColor, pieceID);
  }
  else if (movingDiagonally(currentX, currentY, destinationX, destinationY)){
    return bishop(currentX, currentY, destinationX, destinationY, pieceColor, pieceID);
  }
  else{
    return Promise.resolve(false);
  }
};
const king = (currentX, currentY, destinationX, destinationY, pieceColor, pieceID, playerID) =>{
  if( ( ( currentX === destinationX+1 ) || ( currentX === destinationX-1 ) ) && ( currentY === destinationY) ){
    return Promise.resolve(true);
  }
  else if ( ( ( currentY === destinationY+1 ) || ( currentY === destinationY-1 ) ) && ( currentX === destinationX) ){
    return Promise.resolve(true);
  }
  else{
    return Promise.resolve(false);
  }
};

const pieces = {1:pawn, 2:knight, 3:bishop, 4:rook, 5:king, 6:queen};

module.exports.validateMove = function(
  id,
  pieceID,
  pieceType,
  pieceColor,
  playerID,
  currentX,
  currentY,
  destinationX,
  destinationY
  ) {

  currentX = parseInt(currentX);
  currentY = parseInt(currentY);
  destinationX = parseInt(destinationX);
  destinationY = parseInt(destinationY);
  pieceType = parseInt(pieceType);

  return pieces[pieceType](currentX, currentY, destinationX, destinationY, pieceColor, pieceID, playerID)
  .then( valid =>{
    console.log("valid", valid)
    if (valid){
      return attack(destinationX, destinationY, playerID)
      .then( attacked => {
        if (attacked){
          if (attacked.user_id != playerID){
            updateDB(destinationX, destinationY, pieceID);
            const query = "UPDATE game_pieces SET captured=true WHERE x=$1 AND y=$2";
            db.none(query, [destinationX, destinationY])
            .catch( err =>{
              console.log(err);
            });
            return Promise.resolve(true);
          }
        }
        else{
          updateDB(destinationX, destinationY, pieceID);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  })
  .catch(err =>{
    console.log(err);
  });
}