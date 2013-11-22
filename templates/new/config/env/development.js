/**
 * Development Config
 */

module.exports = {
    "port":3000,
    
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
}