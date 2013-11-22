/**
 * Configure CSS PreProcessor
 */

var lessMiddleWare = require('less-middleware');

module.exports = function(app,express,config){
    app.use(lessMiddleWare(config.lessMiddleWare));
};