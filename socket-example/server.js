const express=require('express');
const app=express();
const path=require('path');
const socketio=require('socket.io'); //serverside library
const http=require('http');

const server=http.createServer(app);  //creating a http server using app where socketio and app can both rum on same server
const io=socketio(server); //socketio instance running on http server

app.use('/',express.static(path.join(__dirname,'frontend')))
let usersockets={}

io.on('connection',(socket)=>{
    console.log("New socket is connected at"+ socket.id)
    socket.emit("connected");

    socket.on('login',function(data){
        usersockets[data.user]=socket.id;
        console.log(usersockets)
    })

    socket.on(('send_msg'),(data)=>{
         //io.emits sends msg to all
        //socket.broadcast.emit.broadcast sends msg to others
        if(data.message.startsWith('@')){
            let recepient=data.message.split(':')[0].substr(1);
            let recptsocket=usersockets[recepient]
            io.to(recptsocket).emit('recv_msg',data)
        }
        else{
            socket.broadcast.emit('recv_msg',data);
        }
     
    })
})

server.listen(3000);