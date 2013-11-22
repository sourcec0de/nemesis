/**
 * Request Logging MiddleWare
 */
 
module.exports = function(app,express){
    // app.use(express.logger(":date :remote-addr :referrer :method :url :status :response-time"));
    app.use(function(req,res,next){
        var date = new Date();
        var url = req.originalUrl;
        var ip = req.ip;
        console.log(ip,url)
        next();
    });
};