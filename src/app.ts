import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Logger from './modules/logger.js'
import Config from './modules/config.js'
import Utils from './modules/utils.js'
import DataStorage from './modules/data_storage.js'
import ApiUtils from './modules/api_utils.js'
import ApiRouterV1 from './routers/api/v1/root.js'
import PagesRouter from './routers/pages.js'
import SwaggerUiDist from 'swagger-ui-dist'

const app = express();

function setupRoutes() {
    // Set-up HTML template
    app.set('views', './views');
    app.set('view engine', 'pug');

    // Routers
    app.use("/public", express.static('./public'));
    app.use("/distjs", express.static('./dist/src/client'));
    app.use('/api-doc', express.static(SwaggerUiDist.absolutePath()));
    app.use(cookieParser());
    app.use(Utils.commonMiddleware);
    app.use(bodyParser.json());
    app.use(function (error, req, res, next) {
        if(error instanceof SyntaxError) {
            return ApiUtils.replyApiKO(res, "Invalid JSON payload", {exception: error.toString()})
        } else {
            next();
        }
    });
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api/v1', ApiRouterV1);
    app.use(PagesRouter);
}

async function startServer() {
    // We retrieve data stored only once at startup (synchroneously)
    await DataStorage.init()

    // Start listening
    app.listen(Config.serverPort, (err?:any) => {
        if (err) {
            return Logger.error(err);
        }
        Logger.info(`Server is listening on port ${Config.serverPort} (in ${Config.isDebugMode ? 'debug' : 'production'} mode)`);
        if (!Config.isRenderCacheEnabled) {
            Logger.warning("Pug cache is disabled")
        }
    });
}

setupRoutes();
if (Config.startServer) {
    Logger.info("Node process started with NODE_ENV="+process.env.NODE_ENV);
    startServer()
} else {
    if (process.env.NODE_ENV !== "test") {
        Logger.warning("Option startServer is set to false: Server will not listen. This option should be set only for testing the app")
    }
}

// For testing
export default app