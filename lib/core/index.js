/**
 * nemesis core
 *
 * base building block
 * express application
 */
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var scan = require('../scan');
var logger = require('../logger');
var find = require('../find');
var nemesisRoot = __dirname + '/../../';
var packageInfo = JSON.parse(fs.readFileSync(nemesisRoot + 'package.json', 'utf8'));
var printjson = require('../printjson');
var ascii = fs.readFileSync(nemesisRoot + 'ascii.txt', 'utf8');
// Expose nemesis core
module.exports = function(root, argv) {
    if (!root) throw new Error("nemesis can't find Missing arg root");
    if (!argv) throw new Error("nemesis can't find Missing argv");
    global.nemesis = {};
    nemesis.argv = argv;
    nemesis.root_path = root;
    nemesis.env = process.env.NODE_ENV || nemesis.argv.env || 'development';
    process.env.NODE_ENV = nemesis.env;

    // Export nemsis modules
    nemesis.modules = {};
    nemesis.modules.scan = scan;
    nemesis.modules.printjson = printjson;

    if (!nemesis.argv['dis-art']) console.log(ascii);


    // Load Config
    var CONFIG = require(root + "/config/env/" + nemesis.env + ".js");
    if (!CONFIG) {
        console.error("Missing config for: " + nemesis.env);
        process.exit(1);
    };

    // init logger transports
    var logConfig = CONFIG.log || {
        "level": argv['log-level'] || "info"
    };
    var transports = require(root + '/config/transports.js');
    if (transports instanceof Function) transports = transports(logConfig);
    logger(transports);
    console.debug("logging transport setup complete")

    // Models
    nemesis.models = scan(root + "/app/models");
    var globalModels = process.env.GLOBAL_MODELS || argv['global-models'] || CONFIG.globalModels;

    // Enable Global Models
    if (globalModels) {
        console.debug("enabling: globalModels")
        Object
            .keys(nemesis.models)
            .forEach(function(modelName) {
                global[modelName] = nemesis.models[modelName];

            });
        nemesis.models = null;
    }

    // Middleware
    // nemesis.middleware = require(root + '/config/middleware.js')();
    // Policies
    nemesis.policies = scan(root + "/app/policies/");
    // controllers
    nemesis.controllers = scan(root + "/app/controllers/");
    // routes
    nemesis.routes = require(root + "/config/routes.js");


    nemesis.app = function() {
        // Init app
        var app = express();
        // configure express
        app.toobusy = require('toobusy'); // https://hacks.mozilla.org/2013/01/building-a-node-js-server-that-wont-melt-a-node-js-holiday-season-part-5/
        app.set('env', nemesis.env);
        app.set('ssl', CONFIG.ssl || false);
        app.set('session', CONFIG.session || false);
        app.set('json spaces', CONFIG['json spaces'] || 0);
        app.set('trust proxy', CONFIG['trust proxy'] || true);
        app.set('strict routing', CONFIG['strict routing'] || false);
        app.set('view cache', CONFIG['view engine'] || false);
        app.set('view engine', CONFIG['view engine'] || 'jade');
        app.set('views', CONFIG.views || root+'/views');
        app.set('json replacer', CONFIG['json replacer'] || null);
        app.set('jsonp callback name', CONFIG['jsonp callback name'] || "callback");
        app.set('case sensitive routing', CONFIG['case sensitive routing'] || false);
        app.set('x-powered-by', CONFIG['x-powered-by'] || [packageInfo.name, packageInfo.version].join(' '));
        app.set('port', process.env.PORT || nemesis.argv.port || CONFIG.port || 3000);

        // MiddleWare
        console.debug("running: middware");
        var middleware = require(root+'/config/middleware.js');
        middleware(app,express,CONFIG);

        // Routing
        var routes = nemesis.routes;
        
        if (routes && typeof routes.manual === 'function') {
            console.debug("running: manual routing");
            routes.manual(app);
        }

        if (routes && routes.spec instanceof Array) {
            console.debug('reading: route.spec')
            for (var i = routes.spec.length - 1; i >= 0; i--) {
                var route = routes.spec[i];
                var callbacks = [];
                var controller = find(route.controller, nemesis.controllers);

                // inject polcies
                if (route.policies instanceof Array) {
                    route.policies.forEach(function(policy) {
                        callbacks.push(find(policy, nemesis.policies));
                    });
                }

                // add controller as last arg
                callbacks.push(controller);
                console.debug("binding:", route.path, route.policies, route.controller);
                app[route.method](route.path, callbacks);
            };
        } else {
            console.error("routes.spec was not instanceof Array");
        };

        // post
        return app;
    };

    nemesis.start = function(app, cb) {
        var port = app.get('port');
        var server = http.createServer(app);
        server.listen(port, cb);
        return server;
    };
}