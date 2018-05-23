const gameCreatedSocket = io( '/games' );

gameCreatedSocket.on( 'created', ( { id, createdBy, createdAt } ) => {});