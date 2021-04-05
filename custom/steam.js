'use strict'
const https = require('https');
/***
 * ORM models
 * @type {object}
 * @property {sequelize.Model} Games
 */
const models = require("../models");

const keys = require('./api_key');
const urlInfo = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+
    keys.KEY + "&steamids=" + keys.UID;

const SteamImgUrl = "https://steamcdn-a.akamaihd.net/steam/apps/";

/**
 * Current running game
 * @type {?number}
 */
let appId = null;

/**
 * Gets info on url and throws an error on error
 * @async
 * @param {string} url - url to check
 * @returns {Promise<void>}
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

/**
 * Data for creating current game banner
 * @typedef GameData
 * @property {string} logo - Game logo
 * @property {string} hero - Banner hero
 * @property {string} align='left' - Logo align inside banner, can be
 * 'left', 'left-stretch', 'center', 'absolute-center'
 */

/**
 * @callback Writer
 * @param {GameData}
 */

/**
 * Sends data through callback
 * @param {Writer} res - where to write game data
 * @param {?number} appId - running appId, could be undefined(default steam banner) or numeric
 * @returns {Promise<void>}
 */
async function sendId(res, appId) {
    if (appId === undefined)
        res({logo: defaultLogo, hero: defaultHero, align: "absolute-center"});
    else {
        let hero_url = SteamImgUrl + appId + "/library_hero.jpg";
        let logo_url = SteamImgUrl + appId + "/logo.png";
        let hero_pic = hero_url;
        let logo_pic = logo_url;

        /**
         * align of logo for current game
         * @type {?object}
         * @property {string} align - one of 'left', 'left-stretch', 'center', 'absolute-center'
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

/**
 * Gets running game info
 * @param {boolean} force - ignore current running app and refresh all clients
 * @returns {Promise<?GameData>}
 */
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
                /**
                 * Steam API response
                 * @type {object}
                 * @property {object[]} players - Array of user info
                 * @property {number} [players.gameid=undefined] - Current running game
                 */
                let SteamUser = JSON.parse(answer).response;
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