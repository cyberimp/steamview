function handle_socket(ws){
    console.log("connected!");
    ws.send("logo.png");
    ws.close();
}

module.exports.handle = handle_socket;