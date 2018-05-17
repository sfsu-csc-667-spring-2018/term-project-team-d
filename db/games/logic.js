const db = require("../index");
// const pieces = require("./pieces");

const updateDB = (destinationX, destinationY, pieceID) => {
  // console.log(pieceID);
  const query = "UPDATE game_pieces SET x=$1, y=$2 WHERE id=$3";
  // return Promise.resolve(true);
  return db.none(query, [destinationX, destinationY, pieceID])
  .catch(err =>{
    console.log("ERR HERE!!!");
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
    console.log("IS ATTACK")
    if( ( ( destinationX === currentX-1 ) || ( destinationX === currentX+1 ) ) && ( destinationY === currentY-1 ) ){
      var capturedQuery = "UPDATE game_pieces SET captured=$1 WHERE x=$2 AND y=$3";
      return db.none(capturedQuery, [true, destinationX, destinationY])
      .catch(err =>{
        console.log(err);
      })
    }
  }
  else{
    Promise.reject("BAD ATTACK PAWN MOVE");
  }
  if(currentY === 7){
    console.log("PLS HELP")
    if( ( (destinationY === (currentY-2)) || (destinationY === (currentY-1)) ) && (currentX === destinationX)){
      return Promise.resolve(true);
    }
  }
  else if ((destinationY === currentY-1) && (destinationX === currentX)){
    console.log("NO PLS HELP")
    return Promise.resolve(true);
  }
  else{
    return Promise.reject("BAD MOVE111111");
  }
}

const legalBlackPawnMove = (currentX, currentY, destinationX, destinationY) =>{

  if (attack(destinationX, destinationY)){
    console.log("IS ATTACK")
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





const pawn = (currentX, currentY, destinationX, destinationY, pieceColor) =>{

  if(pieceColor === "white"){
    return  legalWhitePawnMove(currentX, currentY, destinationX, destinationY) 
      
  }
  else{
    return legalBlackPawnMove(currentX, currentY, destinationX, destinationY);
  }
  return Promise.resolve(true);
};

const knight = (currentX, currentY, destinationX, destinationY) =>{
  //can make knight moves
  return Promise.resolve(true);
};
const rook = (currentX, currentY, destinationX, destinationY) =>{
  //castle moves
  return Promise.resolve(true);
};
const bishop = (currentX, currentY, destinationX, destinationY) =>{
  //bishop moves
  return Promise.resolve(true);
};
const queen = (currentX, currentY, destinationX, destinationY) =>{
  //queen moves
  return Promise.resolve(true);
};
const king = (currentX, currentY, destinationX, destinationY) =>{
  //king moves
  return Promise.resolve(true);
};

const pieces = {1:pawn, 2:knight, 3:rook, 4:bishop, 5:queen, 6:king};

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

  console.log(pieces[1]);
  currentX = parseInt(currentX);
  currentY = parseInt(currentY);
  destinationX = parseInt(destinationX);
  destinationY = parseInt(destinationY);
  pieceType = parseInt(pieceType);

  return pieces[pieceType](currentX, currentY, destinationX, destinationY, pieceColor)
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