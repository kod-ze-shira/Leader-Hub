import socketIOClient from "socket.io-client";

var socket;
var  endpoint='http://localhost:3001/'
socket = socketIOClient(endpoint);
export default socket

