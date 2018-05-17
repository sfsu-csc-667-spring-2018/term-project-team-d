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
      return Promise.reject(false);
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

// const noPieceInWayVertical = (currentX, currentY, destinationX, destinationY, pieceID) =>{
//   var query = "SELECT * FROM game_pieces WHERE x=$1 AND id != $2";
//   var ret = true;
//   return db.many(query, [destinationX, pieceID])
//   .then(data=>{
//     for(var i = 0; i < data.length; i++){
//       //check if moving up
//       if (currentY > destinationY){
//         if (destinationY < data[i].y){
//           console.log(currentY, destinationY, data[i].y)
//           ret = false;
//         }
//       }
//       if (currentY < destinationY){
//         if (destinationY > data[i].y){
//           ret = false;
//         }
//       }
//     }
//   }).catch(err=>{
//     console.log(err)
//   });
// }

// const noPieceInWayHorizontal = (currentX, currentY, destinationX, destinationY, pieceID) =>{
//   var query = "SELECT * FROM game_pieces WHERE y=$1 AND id != $2";
//   db.many(query, [destinationY, pieceID])
//   .then(data=>{
//     if(data){
//       return Promise.resolve(true);
//     }
//   }).catch(err=>{
//     console.log(err)
//   });
//   return Promise.resolve(false);
// }

const pawn = (currentX, currentY, destinationX, destinationY, pieceColor) =>{

  if(pieceColor === "white"){
    return legalWhitePawnMove(currentX, currentY, destinationX, destinationY); 
  }
  else{
    return legalBlackPawnMove(currentX, currentY, destinationX, destinationY);
  }
  return Promise.resolve(false);
};

const knight = (currentX, currentY, destinationX, destinationY) =>{
  var upDownOne = ((destinationY === currentY-1) || (destinationY === currentY+1))
  var upDownTwo = ((destinationY === currentY-2) || (destinationY === currentY+2))
  var leftRightOne = ((destinationX === currentX-1) || (destinationX === currentX+1))
  var leftRightTwo = ((destinationX === currentX-2) || (destinationX === currentX +2))

  if (upDownOne && leftRightTwo){
    return Promise.resolve(true);
  }
  else if (upDownTwo && leftRightOne){
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
  //can make knight moves
};
const rook = (currentX, currentY, destinationX, destinationY, pieceColor, pieceID) =>{

  // if ((currentX === destinationX) && (currentY != destinationY)){
  //   if (noPieceInWayVertical(currentX, currentY, destinationX, destinationY, pieceID)){
  //     return Promise.resolve(true);
  //   }
  // }else if ((currentY === destinationY) && (currentX != destinationX)){
  //   return noPieceInWayHorizontal(currentX, currentY, destinationX, destinationY, pieceID);
  // }    
  // return Promise.resolve(false);

  // // //castle moves
  // // return Promise.resolve(true);
};
const bishop = (currentX, currentY, destinationX, destinationY) =>{
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

  console.log("!!!!!!!!!!!!!!!!");
  console.log(pieces[pieceType]);
  currentX = parseInt(currentX);
  currentY = parseInt(currentY);
  destinationX = parseInt(destinationX);
  destinationY = parseInt(destinationY);
  pieceType = parseInt(pieceType);

  return pieces[pieceType](currentX, currentY, destinationX, destinationY, pieceColor, pieceID)
  .then( update =>{
    console.log('?????????????????');
    console.log(update);
    if (update){
      updateDB(destinationX, destinationY, pieceID);
    }
  })
  .catch(err =>{
    console.log(err);
    // return Promise.reject(err);
  });
}