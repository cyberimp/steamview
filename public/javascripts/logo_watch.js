let socket = new WebSocket("ws://127.0.0.1:7000/socket");
let logo = document.getElementById("logo");
socket.onmessage = (msg) => {
   logo.src = "/images/"+msg.data;
};