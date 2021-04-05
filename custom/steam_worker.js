const steam = require('./steam');
const {parentPort} = require('worker_threads');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

parentPort.on("message", async (msg) =>
{
    if (msg !== "refresh")
        return;
    let appInfo = await steam.getAppId(true);
    parentPort.postMessage(appInfo);
})

async function work() {
    // noinspection InfiniteLoopJS
    while (true) {
        /**
         *
         * @type {?GameData}
         */
        let appInfo = await steam.getAppId(false);
        if (appInfo) {
            console.log(appInfo);
            parentPort.postMessage(appInfo);
        }
        await sleep(1000);
    }
}

work().then();