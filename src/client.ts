import * as socketioclient from "socket.io-client";

const socket = socketioclient('http://localhost:3000')

socket.emit('message', 'test');
socket.emit('setname', 'user1')

//setname

//get hand

//set pick

//ask for pick