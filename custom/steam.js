const https = require('https');
const keys = require('./api_key');
/***
 *
 * @type {object}
 * @property {sequelize.Model} Games
 */
const models = require("../models");

const urlInfo = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+
    keys.KEY + "&steamids=" + keys.UID;
let appId = null;

/***
 * @typedef ISteamUser
 * @type {object}
 * @property {number} [gameid]
 * @property {number} steamid
 * @property {string} personaname
 */

async function httpsGetInfo (url){
    return new Promise((resolve, reject) => {
        https.get(url, res =>
            (res.statusCode<400)?resolve():reject()
        );
    });
}

const defaultHero = "/images/no_hero.png";
const defaultLogo = "/images/default.png";

async function sendId(res, appId) {
    if (appId === undefined)
        res({logo: defaultLogo, hero: defaultHero, align: "absolute-center"});
    else {
        let hero_url = "https://steamcdn-a.akamaihd.net/steam/apps/"+appId+"/library_hero.jpg";
        let logo_url = "https://steamcdn-a.akamaihd.net/steam/apps/"+appId+"/logo.png";
        let hero_pic = hero_url;
        let logo_pic = logo_url;
        /***
         * @type {?object}
         * @property {string} align
         */
        let gameInfo = await models.Games.findByPk(appId, {attributes: ['align']});
        let align = gameInfo?gameInfo.align:"left";

        await httpsGetInfo(hero_url).catch(() => hero_pic = defaultHero);
        await httpsGetInfo(logo_url).catch(() => {
            logo_pic = defaultLogo;
            align = "absolute-center";
        });

        res({logo: logo_pic, hero: hero_pic, align: align});
    }

    console.log(appId);
}


async function getAppId(force) {
    return new Promise(resolve => {
        let answer = "";
        https.get(urlInfo, res => {
            res.on("data", chunk => {
                answer += chunk.toString();
            })
        })
            .on("close", ()=>{
                console.log("got steam page!");
                /***
                 * @type {object}
                 * @property {ISteamUser[]} players
                 */
                let SteamUser = JSON.parse(answer).response
                let gameId = SteamUser.players[0].gameid;
                if (appId === gameId && !force)
                    resolve(null);
                else {
                    appId = gameId;
                    sendId(resolve, appId);
                }
            })
            .on("error", () => resolve(null))
    });
}

module.exports.getAppId = getAppId;