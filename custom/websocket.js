function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function handle_socket(ws){
    console.log("connected!");
    const steam = require('./steam');
    while(ws.readyState === ws.OPEN){
        let appInfo = await steam.getAppId();
        if (appInfo) {
            console.log(appInfo)
            ws.send(JSON.stringify(appInfo));
        }
        await sleep(1000);
    }
}

module.exports.handle = handle_socket;