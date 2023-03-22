import Config from './config.js'
import ApiUtils from './api_utils.js'
import Logger from './logger.js'

module Utils {
    
    export function commonMiddleware(req, res, next) {
        res.locals.startTime = new Date();
        res.locals.isDebugMode = Config.isDebugMode;
        res.locals.cache = Config.isRenderCacheEnabled;
        res.locals.websiteName = Config.webServerName;
        res.locals.homePageUrl = Config.homePageUrl;
        res.locals.isTestInstance = Config.isTestInstance;

        // Default HTTP Headers
        res.header("Access-Control-Allow-Origin", "https://editor.swagger.io");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "*");

        next();
    }

    export function generateRandomToken(length:number) {
        var requestedLength = length ? length : 15;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i=0; i<requestedLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    export function generateRandomTokenForMap(map, length) {
        var ret = generateRandomToken(length ? length : 20);
        while (map[ret]) ret = generateRandomToken(length ? length : 20);
        return ret
    }
}

export default Utils