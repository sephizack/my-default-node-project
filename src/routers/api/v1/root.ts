import express from 'express'
import MyFeatureApiRouter from './myfeature.js'
import SecurityApiRouter from './security.js'
import ApiUtils from '../../../modules/api_utils.js'

var router = express.Router();

router.use('/my-feature', MyFeatureApiRouter);
router.use('/security', SecurityApiRouter);

router.get('/ping', function (req, res) {
    ApiUtils.replyApiOK(res, "pong")
});

// If we reach this router in means the requested URl has not been handled by any route above.
// So we catch here the HTTP 404 (under /api/v1 only)
router.use((req,res) => {
    ApiUtils.replyApiKO(res, "URL and method does not match any valid API route", {}, 404)
});

export default router