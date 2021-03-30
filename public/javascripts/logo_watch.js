let host = window.location.host;
let socket = new WebSocket("ws://" + host + "/socket");
let logo = document.getElementById("logo");
let hero = document.getElementById("hero");
socket.onmessage = (msg) => {
   let message = JSON.parse(msg.data);
   logo.src = "/images/" + message.logo;
   logo.classList.remove("left", "right", "center", "absolute-center");
   logo.classList.add(message.align);
   hero.src = "/images/" + message.hero;
};