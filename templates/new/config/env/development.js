/**
 * Development Config
 */
var path = require('path');
var viewsPath = path.join(nemesis.root_path, 'views');
var lessSrcPath = path.join(nemesis.root_path,'/assets/src/less');
var cssDest = path.join(nemesis.root_path,'/public/css');

module.exports = {
    "port":3000,
    "views": viewsPath,
    // log is sent to logTransports
    // "log":{
    //     "level":"debug"
    // },
    

    /**
     * GLOBAL MODELS
     * env var = GLOBAL_MODELS
     * argv var = --global-models
     *
     * setting to false will disable global
     * model injection and all models will
     * only be accessible from `nemeis.models.<ModelName>`
     **/

    // "globalModels": false, // defaults to true


    // css PreProcessor settings
    "lessMiddleWare":{
        "force": true,
        "src":  lessSrcPath,
        "dest": cssDest,
        "prefix": '/css',
        "debug": true
    }
}