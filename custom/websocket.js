let {Worker} = require('worker_threads');

async function handle_socket(ws){
    console.log("connected!");
    if (global.worker === undefined){
        global.worker = new Worker("./custom/steam_worker.js");
    }

    global.worker.postMessage("refresh");

    function listener(msg){
        if (ws.readyState === ws.CLOSED){
            console.log("disconnect!");
            global.worker.removeListener("message", listener);
            return;
        }
        if (msg) {
            console.log(msg)
            ws.send(JSON.stringify(msg));
        }
    }

    global.worker.addListener("message", listener);

}

module.exports.handle = handle_socket;