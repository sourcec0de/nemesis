module.exports = function(req,res,next){
    console.log("checking if authentication")
    next()
}