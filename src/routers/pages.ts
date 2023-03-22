import express from 'express'
import Config from '../modules/config.js'
import Logger from '../modules/logger.js'
import Utils from '../modules/utils.js'

var router = express.Router();


// Main url redirect to pull request page of ROC
router.get('/', function (req, res) {
    res.redirect(Config.homePageUrl);
});

router.get('/home', function (req, res) {
    res.render('home', {
        title: "Home - " + Config.webServerName,
        curNav: 'home'
    });
});

// If we reach this router in means the requested URl has not been handled by any route above.
router.use((req,res) => {
    res.render('pageNotFound', {
        title: 'Page not found',
        curNav: 'home'
    });
});

export default router