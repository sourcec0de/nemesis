// Initilize Nemesis
require('nemesis')(__dirname,require('optimist').argv);

// build new application
var app = nemesis.app();

// start the server
var server = nemesis.start(app,function(){
    console.log(
        "nemesis is listening on port %d in %s", 
        app.get('port'),
        app.get('env'))
});



/** 
 * nemesis.start returns an instance of http.createServer
 */

// server.on('request',function(req,res){
//     console.log(req.headers);
// });