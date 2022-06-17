const express = require("express"); // Access
const socket = require("socket.io");

const app = express();//initialize
app.use(express.static("FrontEnd"));

let port = 5000;
let server = app.listen(port, () => {
    console.log("Listening to port" + port);
})

let io = socket(server);

io.on("connection" ,(socket) => {
    console.log("made socket connection");
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke",(data) => {
        io.sockets.emit("drawStroke",data);
    })

    socket.on("redoUndo",(data) =>{
        io.sockets.emit("redoUndo",data);
    })
})