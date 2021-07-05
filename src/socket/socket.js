import socketIOClient from "socket.io-client";

var socket;
// var  endpoint='https://socket.hub.dev.leader.codes:5002‎/'
socket = socketIOClient();
socket.connect('https://socket.hub.dev.leader.codes:5002‎/')
export default socket;

