#Steam game display

Works only with one client now, two will overwrite same 
files for picture cache (do I need it?). When game has 
no logo, displays steam logo.

You need to write your own `custom/api_key.js` 
with following content:
```js
module.exports.UID = "your 64 bit Steam ID"
module.exports.KEY = "your web api key"
```

Your API key is at: https://steamcommunity.com/dev/apikey
(with this you can view your profile even if it's closed)

You can lookup your 64bit steamID at https://steamidfinder.com/

Steam is &trade; & &reg; of Valve Corporation, I'm not affiliated with them.
