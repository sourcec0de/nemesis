/**
 * Routes config
 */


// Allows you to manually control routing
// using standard express convesions
module.exports.manual = function(app) {
    app.get('/test',function(req,res){
        res.json({
            message:"testing manual routes"
        });
    });
};

// Routes will automatically be created
// using the spec, in the order provided here.
module.exports.spec = [
    {  path: '/',  method: 'get',  controller: 'items.index', policies: ['api.protect', 'authenticate'] },
];