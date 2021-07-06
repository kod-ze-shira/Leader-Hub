import socketIOClient from "socket.io-client";

var socket;
var  endpoint='https://socket.hub.dev.leader.codes:5002‎/'
socket = socketIOClient();
socket.connect('https://socket.chat.leader.codes')
console.log(socket)
socket.on("connection", () => {
    console.log(socket);
    console.log('connect');
});

export default socket;

