import express from 'express'
import DataStorage from '../../../modules/data_storage.js'
import ApiUtils from '../../../modules/api_utils.js'
import Config from '../../../modules/config.js'

var router = express.Router();

router.get('/getById/:id([0-9]+)', function(req,res) {
    if (parseInt(req.params.id) > 10) {
        return ApiUtils.replyApiOK(res, "Your ID is higer than 10", {
            "result": req.params.id
        })
    } else {
        return ApiUtils.replyApiKO(res, "Your ID should be higher than 10")
    }
});

router.get('/callWithRegexpCheck', function(req,res) {
    if (!ApiUtils.checkAttributeFormat(req, res, 'data', /^[A-Za-z0-9\-_\[\] ]+$/g, 3)) {
        return;
    }
    return ApiUtils.replyApiOK(res, "Your data is matching regexp", {})
});

router.get('/getStoredData', function(req,res) {
    return ApiUtils.replyApiOK(res, "Here is server data", {
        "my_data": DataStorage.accessServerData()
    })
});

router.post('/pushData/:key([A-Za-z0-9]+)/:data([A-Za-z0-9]+)', function(req,res) {
    DataStorage.accessServerData()[req.params.key] = req.params.data;
    DataStorage.syncServerDataToDisk();
    return ApiUtils.replyApiOK(res, "Data added", {})
});

export default router