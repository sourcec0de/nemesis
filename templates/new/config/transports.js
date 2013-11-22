/**
 * Logger Transports
 */

var winston = require('winston');

// export transport array
module.exports = function(opts){
    
    // Console logging
    var consoleTransport = new winston.transports.Console({
        "level": opts.level,
        "json": false,
        "colorize": true
    });


    return [
        consoleTransport
    ];
}