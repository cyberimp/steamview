# Steam game display

This app is tool for displaying logo of currently running 
game in Steam on separate display (banner displays are 
recommended), written in Javascript. When game has no logo,
or no game is running, displays steam logo.

You need to write your own `custom/api_key.js` 
with following content:
```js
module.exports.UID = "your 64 bit Steam ID"
module.exports.KEY = "your web api key"
```

Your API key is at: https://steamcommunity.com/dev/apikey
(with this you can view your profile even if it's closed)

You can lookup your 64bit steamID at https://steamidfinder.com/

To run, install Node.js, run `npm start` in project folder, and connect to
http://YOUR_IP:7000 with your favourite browser (don't forget to put it 
fullscreen mode).

Steam is &trade; & &reg; of Valve Corporation, I'm not affiliated with them.
