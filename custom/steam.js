const https = require('https');
const keys = require('./api_key');

const urlInfo = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+
    keys.KEY + "&steamids=" + keys.UID;
let appId = null;
const fs = require('fs');

async function httpsGetSync (url, path){
    let Stream = require('stream').Transform;
    return new Promise(((resolve, reject) => {
        https.get(url, res => {
            let data = new Stream();
            res.on('error', reject);
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => {
                if (res.statusCode === 404)
                    reject(404);
                else {
                    fs.writeFileSync(path, data.read());
                    resolve();
                }
            })
        });
    }));
}

async function sendId(res, appId) {
    if (appId === undefined)
        res({logo: "default.png", hero: "no_hero.png", align: "absolute-center"});
    else{
        let logoFname = "./public/images/logo_"+appId+".png"
        let heroFname = "./public/images/hero_"+appId+".jpg"

        if (fs.existsSync(logoFname))
            res({logo: "logo_"+appId+".png", hero: "hero_"+appId+".jpg", align: "left"});
        else
        {
            let hero_url = "https://steamcdn-a.akamaihd.net/steam/apps/"+appId+"/library_hero.jpg";
            let logo_url = "https://steamcdn-a.akamaihd.net/steam/apps/"+appId+"/logo.png";
            let hero_pic = "hero_"+appId+".jpg";
            let logo_pic = "logo_"+appId+".png";
            let align = "left";

            await httpsGetSync(hero_url,heroFname).catch(() => hero_pic = "no_hero.png");
            await httpsGetSync(logo_url,logoFname).catch(() => {
                logo_pic = "default.png";
                align = "absolute-center";
            });

            res({logo: logo_pic, hero: hero_pic, align: align});
        }

    }
    console.log(appId);
}

async function getAppId() {
    return new Promise(resolve => {
        let answer = "";
        https.get(urlInfo, res =>
            {
                res.on("data", chunk => {
                    answer+=chunk.toString();
                })
            })
            .on("close", ()=>{
                console.log("got steam page!");
                let gameid = JSON.parse(answer).response.players[0].gameid;
                if (appId === gameid)
                    resolve(null);
                else {
                    appId = gameid;
                    sendId(resolve, appId);
                }
            })
            .on("error", err => resolve(null))

    });
}

module.exports.getAppId = getAppId;