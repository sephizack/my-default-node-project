import Utils from './utils.js'
import Config from './config.js'
import Logger from './logger.js'
import DataStorage from './data_storage.js'

module ApiUtils {
    export function replyApiOK(res, message:string, additionnalData?:any, httpStatus?:number) {
        res.status(httpStatus ? httpStatus : 200)
        replyApiJson(res, false, message, additionnalData)
        return true
    }

    export function replyApiKO(res, message:string, additionnalData?:any, httpStatus?:number) {
        res.status(httpStatus ? httpStatus : 400)
        replyApiJson(res, true, message, additionnalData)
        return false
    }

    export function checkAttributeFormat(req, res, name, regexp, minLength) {
        let aData = null
        if (req.body[name] !== undefined) {
            aData = req.body[name]
        }
        else if (req.query[name] !== undefined) {
            aData = req.query[name]
        }
        else if (req.params[name] !== undefined) {
            aData = req.params[name]
        }
        else {
            return ApiUtils.replyApiKO(res, `Attribute '${name}' is not found`)
        }
        aData = aData.toString().trim()
        if (aData.length < minLength) {
            return ApiUtils.replyApiKO(res, `Attribute '${name}' must be at least ${minLength} charaters long`)
        }
        if (!aData.match(regexp)) {
            return ApiUtils.replyApiKO(res, `Attribute '${name}' did not match regexp ${regexp}`)
        }
        return true
    }

    // Private
    function replyApiJson(res, isError:boolean, message:string, additionnalData?:any) {
        let replyData:any = additionnalData;
        if (!replyData) replyData = {}
        replyData["status"] = isError ? "KO" : "OK";
        replyData["message"] = message;
        res.json(replyData)
    }
}

export default ApiUtils