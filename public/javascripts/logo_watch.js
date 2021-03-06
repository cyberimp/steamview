let host = window.location.host;
let socket = new WebSocket("ws://" + host + "/socket");
let logo = document.getElementById("logo");
let hero = document.getElementById("hero");
socket.onmessage = (msg) => {
    let message = JSON.parse(msg.data);
    logo.src = message.logo;
    logo.classList.remove("left", "right", "center", "absolute-center", "left-stretch");
    logo.classList.add(message.align);
    hero.src = message.hero;
};