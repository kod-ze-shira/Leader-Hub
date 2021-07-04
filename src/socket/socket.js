import socketIOClient from "socket.io-client";

var socket;
var  endpoint='https://hub.dev.leader.codes:3028/'
socket = socketIOClient(endpoint);
export default socket

