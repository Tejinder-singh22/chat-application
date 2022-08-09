const express = require('express');
const app = express();
const http = require('http').createServer(app);


const PORT = process.env.PORT || 3000
http.listen(PORT, ()=>{
  console.log(`listning on port ${PORT}`);
})
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

//socket

const io = require('socket.io')(http)

io.on('connection',(socket)=>{    //this is setup for server.js so that cient can communicate to this server
  console.log('connected');

  socket.on('message',(msg)=>{   //handle/on incomming data from client side having name message
    // console.log(msg);

    socket.broadcast.emit('message', msg)  //here sending/emiting this message to all connected sockets by name message/anything
  })

})