/**
 * Configure Middlware
 */

var path = require('path');
var connectTimeout = require('connect-timeout');
var middlewareDir = path.join(__dirname,'middleware');
var middleware = nemesis.modules.scan(middlewareDir);

// Init Express Middleware
module.exports = function(app, express, config) {
    // The absolute first piece of middle-ware we would register, to block requests
    // before we spend any time on them.
    middleware.tooBusy(app,express,config);

    // Setup a request logger
    middleware.requestLogger(app,express,config);
    
    // Only load favicon after logger
    // save space on stuff you dont need to log
    app.use(express.favicon());

    // Enable Req Timeouts
    app.use(connectTimeout({}));

    // gzip responses
    app.use(express.compress());

    // Enable CSS Pre Processing
    // defaults to less
    // middleware.cssPre(app,express,config);


    // Enable Session Support
    middleware.sessions(app, express);

    // enable static resources
    // consider serving these from a CDN
    var staticPath = path.join(nemesis.root_path, 'public');
    app.use(express.static(staticPath, {
        maxAge: 0, // Browser cache maxAge in milliseconds. defaults to 0, oneDay = 86400000
        hidden: false, // Allow transfer of hidden files. defaults to false
        redirect: true, // Redirect to trailing "/" when the pathname is a dir. defaults to true
        // index: 'index.html' // Default file name, defaults to 'index.html'
    }));


    // Parse JSON request bodies, providing the
    // parsed object as req.body.
    app.use(express.json({
        // strict:false // when false anything JSON.parse() accepts will be parsed
        // reviver: // used as the second "reviver" argument for JSON.parse
        // limit: // byte limit [1mb]
    }));

    // Parse x-ww-form-urlencoded request bodies,
    // providing the parsed object as req.body.
    app.use(express.urlencoded({
        // limit: // byte limit [1mb]
    }));

    // Add middleware to parse double encoded urls that may
    // contain JSON strings when ?qs_fmt=json is present
    // app.use(qsJsonParser)

    // Replace multipart with your own
    // file handling middleware
    // app.use(express.multipart());
    // See upgrading to 3.0 info
    // https://github.com/senchalabs/connect/wiki/Connect-3.0

    // validation module
    // app.use(expressValidator());

    // Make your api more strict by disabling
    // the ability to overide a req method ?_method=POST
    app.use(express.methodOverride());
};