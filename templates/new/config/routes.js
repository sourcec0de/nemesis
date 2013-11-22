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
    {  path: '/',  method: 'get',  controller: 'index' },
    
    // Polcies are attached here try visiting /items
    // and look at the console. The polcies have left you a message
    // **NOTICE** the naming conventions match the directory structure
    {  path: '/items',  method: 'get',  controller: 'items.index', policies: ['api.protect', 'authenticate'] },
];