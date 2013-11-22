/**
 * TooBusy
 * Allows the application to keep itself
 * alive durring heavy load
 */
 
module.exports = function(app, express, config) {
    app.use(function(req, res, next) {
        // check if we're toobusy() - note, this call is extremely fast, and returns
        // state that is cached at a fixed interval
        var message = config.tooBusyMessage || "I'm busy right now, sorry.";
        if (req.app.toobusy()) {
            res.send(503, message);
        } else {
            next();
        };
    });
};