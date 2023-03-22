import config from 'config';

module Config {
    export const webServerName:string = config.get('webServerName');
    export const serverShortName:string = config.get('serverShortName');
    export const serverPort:number = config.get('serverPort');
    export const hostname:string = config.get('hostname');
    export const isRenderCacheEnabled:boolean = config.get('renderCacheEnabled');
    export const startServer:boolean = config.get('startServer');
    export const isDebugMode:boolean = config.get('isDebugMode');
    export const isTestInstance:boolean = config.has('isTestInstance') ? config.get('isTestInstance') : false;
    export const homePageUrl:string = "/home";
    export const logsPath:string = config.get('logsPath');
    export const nodePersistStoragePath:string = config.get('nodePersistStoragePath');
}

export default Config
