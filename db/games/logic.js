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

const attack = (destinationX, destinationY) =>{
  var query = "SELECT * FROM game_pieces WHERE x=$1 AND y=$2";
  return db.one(query, [destinationX, destinationY])
  .catch(err =>{
    console.log("ERR IN ATTACK")
    console.log(err)
  });
}

const legalWhitePawnMove = (currentX, currentY, destinationX, destinationY) =>{
  if (attack(destinationX, destinationY)){
    if( ( ( destinationX === currentX-1 ) || ( destinationX === currentX+1 ) ) && ( destinationY === currentY-1 ) ){
       const query = "UPDATE game_pieces SET captured=true WHERE x=$1 AND y=$2";
        db.none(query, [destinationX, destinationY])
       .catch(err =>{
        console.log(err);
       });
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

const legalBlackPawnMove = (currentX, currentY, destinationX, destinationY) =>{

  if (attack(destinationX, destinationY)){
    if( ( ( destinationX === currentX-1 ) || ( destinationX === currentX+1 ) ) && ( destinationY === currentY+1 ) ){
       const query = "UPDATE game_pieces SET captured=true WHERE x=$1 AND y=$2";
        db.none(query, [destinationX, destinationY])
       .catch(err =>{
        console.log(err);
       });
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
    console.log("ERR IN nothingInTheWayVeritcal");
    console.log(err);
    return Promise.resolve(true);
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
  var query = "SELECT * FROM game_pieces WHERE y=$1 AND id!=$2";

  if (currentX < destinationX){
    xIncrementer = 1;
  }
  else{
    xIncrementer = -1;
  }

  if (currentY < destinationY){
    yIncrementer = 1;
  }
  else{
    yIncrementer = -1;
  }

  return db.any(query, [destinationY, pieceID])
  .then(pieces =>{
    for( var i = 0; i < pieces.length; i++){
      var y = currentY;
      for(var x = currentX; x < destinationX; x += xIncrementer){
        if((pieces[i].x === x) && (pieces[i].y === y)){
          return Promise.resolve(false);
        }
        y += yIncrementer;
      }
    }
    return Promise.resolve(true);
  })
  .catch(err =>{
    console.log("ERR IN nothingInTheWayVeritcal");
    console.log(err);
  });
}


const pawn = (currentX, currentY, destinationX, destinationY, pieceColor) =>{

  if(pieceColor === "white"){
    return legalWhitePawnMove(currentX, currentY, destinationX, destinationY); 
  }
  else if (pieceColor === "black"){
    return legalBlackPawnMove(currentX, currentY, destinationX, destinationY);
  }else{
    return Promise.resolve(false);
  }
};

const knight = (currentX, currentY, destinationX, destinationY) =>{
  var upDownOne = ((destinationY === currentY-1) || (destinationY === currentY+1))
  var upDownTwo = ((destinationY === currentY-2) || (destinationY === currentY+2))
  var leftRightOne = ((destinationX === currentX-1) || (destinationX === currentX+1))
  var leftRightTwo = ((destinationX === currentX-2) || (destinationX === currentX +2))

  if( (upDownOne && leftRightTwo) || (upDownTwo && leftRightOne) ){
    if (attack(destinationX, destinationY)){
       const query = "UPDATE game_pieces SET captured=true WHERE x=$1 AND y=$2";
        db.none(query, [destinationX, destinationY])
       .catch(err =>{
        console.log(err);
       });
       return Promise.resolve(true);
    }
    return Promise.resolve(true)
  }
  return Promise.resolve(false);
  //can make knight moves
};
const rook = (currentX, currentY, destinationX, destinationY, pieceColor, pieceID) =>{
  if ( movingVertical(currentX, currentY, destinationX, destinationY) ){
   if (nothingInTheWayVeritcal(currentX, currentY, destinationX, destinationY, pieceID)){
    if (attack(destinationX, destinationY)){
          const query = "UPDATE game_pieces SET captured=true WHERE x=$1 AND y=$2";
          db.none(query, [destinationX, destinationY])
          .catch(err =>{
            console.log(err);
          });
        return Promise.resolve(true);
      }
    return Promise.resolve(true);
    }
  }
  else if ( movingHorizontal(currentX, currentY, destinationX, destinationY) ){
    if (nothingInTheWayHorizontal(currentX, currentY, destinationX, destinationY, pieceID)){
      if (attack(destinationX, destinationY)){
        const query = "UPDATE game_pieces SET captured=true WHERE x=$1 AND y=$2";
        db.none(query, [destinationX, destinationY])
        .catch(err =>{
          console.log(err);
        });
        return Promise.resolve(true);
      }
    return Promise.resolve(true);
    }
  }
  else{
    return Promise.resolve(false);
  }
};
const bishop = (currentX, currentY, destinationX, destinationY) =>{
  if (movingDiagonally(currentX, currentY, destinationX, destinationY)){
    if (nothingInTheWayDiagonally(currentX, currentY, destinationX, destinationY)){
      if(attack(destinationX, destinationY)){
        const query = "UPDATE game_pieces SET captured=true WHERE x=$1 AND y=$2";
        db.none(query, [destinationX, destinationY])
        .catch(err =>{
          console.log(err);
        });
        return Promise.resolve(true);
      }
      return Promise.resolve(true);
    }
  }
  else{
    return Promise.resolve(false);
  }
};

const queen = (currentX, currentY, destinationX, destinationY) =>{
  //queen moves
  return Promise.resolve(true);
};
const king = (currentX, currentY, destinationX, destinationY) =>{
  //king moves
  return Promise.resolve(true);
};

const pieces = {1:pawn, 2:knight, 3:bishop, 4:rook, 5:queen, 6:king};

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

  return pieces[pieceType](currentX, currentY, destinationX, destinationY, pieceColor, pieceID)
  .then( update =>{
    if (update){
      updateDB(destinationX, destinationY, pieceID);
    }
  })
  .catch(err =>{
    console.log(err);
    // return Promise.reject(err);
  });
}