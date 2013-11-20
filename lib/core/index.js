/**
 * nemesis core
 *
 * base building block
 * express application
 */

_argv = require('optimist').argv;
var express = require('express');

module.exports = function(){
    var app = express();
    console.log(__dirname);
    app.toobusy = require('toobusy'); // https://hacks.mozilla.org/2013/01/building-a-node-js-server-that-wont-melt-a-node-js-holiday-season-part-5/
    app.set('env', __NODE_ENV);
    app.set('port',                   CONFIG['port']           || 3000);
    app.set('ssl',                    CONFIG['ssl']            || false);
    app.set('session',                CONFIG['session']        || false);
    app.set('json spaces',            CONFIG['json spaces']    || 0);
    app.set('trust proxy',            CONFIG['trust proxy']    || true);
    app.set('strict routing',         CONFIG['strict routing'] || false);
    app.set('view cache',             CONFIG['view engine']    || false);
    app.set('view engine',            CONFIG['view engine']    || 'jade');
    app.set('views',                  CONFIG['views']);
    app.set('json replacer',          CONFIG['json replacer']  || null);
    app.set('jsonp callback name',    CONFIG['jsonp callback name']    || "callback");
    app.set('case sensitive routing', CONFIG['case sensitive routing'] || false);
    app.set('request_timeout',        CONFIG['request_timeout']        || { throwError: true, time: 100000 });
    app.set('x-powered-by','nemesis x.x.x');
}