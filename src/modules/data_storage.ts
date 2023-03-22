import fs from 'fs'
import nodePersist from 'node-persist'
import Config from './config.js'
import Logger from './logger.js'
import Utils from './utils.js'
import ApiUtils from './api_utils.js'

module DataStorage {
    export class MyDataFormatStruct{
		value: any;
	}
    export interface MyDataMap {
        [key: number]: MyDataFormatStruct
    }

    let isInitialized:boolean = false;
    // Raw Data that can be serialized as-is
    let _my_data: MyDataMap = {};

    // Computed data
    let _delayed_persist_timeout:any = {};
    let _delayed_persist_interupt_count:any = {};


    // Retrieve from storage
    export async function init() {
        let startTime = new Date();
        await nodePersist.init(createStorageOptions());

        // Get data from all files
        _my_data = await nodePersist.getItem(getPersistKey("my_data")) || {};

        Logger.ok("Persisted data retrieved in "+ (new Date().getTime() - startTime.getTime()) + " ms");

        if (Config.isDebugMode) {
            Logger.debug(`${Object.keys(_my_data).length} persisted data retrieved`);
        }

        // Auto Sync data every minute if not requested manually by code
        setInterval(this.syncServerDataToDisk, 60*1000)

        isInitialized = true
    }

    export function accessServerData() {
        return _my_data;
    }

    export async function syncServerDataToDisk()
    {
        delayedSaveToDisk("my_data", _my_data)
    }


    // Persist to disk with delayed timer, in case a new persist request arrives it will
    function delayedSaveToDisk(key, value) {
        if (!isInitialized) {
            Logger.debug("Data Storage module was not initialized. Skipping save to disk request.")
        }
        if (_delayed_persist_timeout[key]) {
            if(_delayed_persist_interupt_count[key] > 100) {
                Logger.debug(`Persist for key '${key}' interrupted ${_delayed_persist_interupt_count[key]} times in a row. Ignoring save request to let the timer expire.`)
                return;
            }
            clearTimeout(_delayed_persist_timeout[key])
            if (!_delayed_persist_interupt_count[key]) {
                _delayed_persist_interupt_count[key] = 0
            }
            _delayed_persist_interupt_count[key] += 1
        }
        _delayed_persist_timeout[key] = setTimeout(async () => {
            delete _delayed_persist_timeout[key]
            _delayed_persist_interupt_count[key] = 0
            try {
                await nodePersist.setItem(getPersistKey(key), value)
            } catch(e) {
                Logger.error(`Unable to save to disk '${key}': `, e);
            }
        }, 2000);
    }

    function createStorageOptions() {
        var storageOptions: {[k: string]: any} = {}
        if (Config.nodePersistStoragePath !== '' && fs.existsSync(Config.nodePersistStoragePath)) {
            storageOptions.dir = Config.nodePersistStoragePath;
            Logger.info('Using '+storageOptions.dir+' to persist data instead of default')
        } else {
            Logger.info('Using default node-persist path to persist data, if we are in a Docker container it will be lost with the container!')
        }
        return storageOptions
    }

    function getPersistKey(name:string) {
        return 'persist' + (Config.isDebugMode ? '_debug' : '') + '_' + name
    }

}

export default DataStorage