import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path"
import { User, Draft } from "./models/user";

let users: User[] = [];

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require('http').Server(app);
// set up socket.io and bind it to our
// http server.
let io = socketio(http) //require('socket.io')(http);

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', function(socket: socketio.Socket){
  console.log('a user connected');
  // whenever we receive a 'message' we log it out
  socket.on('message', function(message: any){
    console.log(message);
  });

  socket.on('setname', (message: string ) => {
    const user = users.find(user => user.socket === socket);
    if(user){
      user.username = message;
    }else{
      users.push(new User(socket, message));
      new Draft(users);
    }
  })
  
});


const server = http.listen(3000, function(){
  console.log('listening on *:3000');
});