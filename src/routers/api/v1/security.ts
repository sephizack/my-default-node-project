import express from 'express'
import DataStorage from '../../../modules/data_storage.js'
import Logger from '../../../modules/logger.js'
import ApiUtils from '../../../modules/api_utils.js'
import Utils from '../../../modules/utils.js'
import Config from '../../../modules/config.js'

var router = express.Router();

router.post('/getAuthToken', async function (req, res) {
    ApiUtils.replyApiKO(res, `Not implemented`, {})
});

export default router
