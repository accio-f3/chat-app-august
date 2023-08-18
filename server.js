// imports from node modules
const express = require('express');
const SocketIO = require('socket.io');
const http = require('http');

// these are extracting things from above imports
const expressServer = express(); // getting app from express function
const { Server } = SocketIO; // socketIO gives me a Server Class
// this 'Server Class' takes an http server and gives me an IO

// as the server that i am getting from express() is not proper http
const httpServer = http.createServer(expressServer);
const IO = new Server(httpServer);

// PORT
const PORT = 3333;

// middleware to run my client
expressServer.use(express.static('client'));

// this on start function
function onStartFn(){
    console.log('server is up and running');
}

// my server should listen me on this PORT and run
// onStartFn just to confirm if my server is running
httpServer.listen(PORT,onStartFn);

IO.on('connection',(socket)=>{ // connection is predefined syntax
    console.log('connection established', socket.id);
    // 'chat message' is my defined event
    // you can use any syntax
    // this is step 2
    socket.on('chat message',(data)=>{ // I got data in my socket from
        // client
        // this is my step 3
        IO.emit('chat message',data);
    })
    socket.on('disconnect',()=>{
        console.log(socket.id,'left the chat');
    })
})


// .on is event syntax for IO and sockets
/// UI PART ///------server part-----/// UI part
// client A -> socket A ->Io -> emit -> socket B -> client B
// app -> express server
// httpServer -> app modified into httpServer
// app -> httpServer