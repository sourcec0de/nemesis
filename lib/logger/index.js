/**
 * nemesis logger
 *
 * overrides console logging with winston loggers
 */

var util = require('util');
var winston = require('winston');
var formatArgs = function(args) {
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
};

module.exports = function(transports) {

    var logger = new winston.Logger({
        "transports": transports
    });

    console.log = function() {
        return logger.info.apply(logger, formatArgs(arguments));
    };

    console.info = function() {
        return logger.info.apply(logger, formatArgs(arguments));
    };

    console.warn = function() {
        return logger.warn.apply(logger, formatArgs(arguments));
    };

    console.error = function() {
        return logger.error.apply(logger, formatArgs(arguments));
    };

    console.debug = function() {
        return logger.debug.apply(logger, formatArgs(arguments));
    };
}