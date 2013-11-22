// Climbs an object
module.exports = function(a,obj,d){
    var found = null;
    if(typeof a === 'string') a = a.split(d || '.');
    a.forEach(function(key){
        if(!found){
            found = obj[key];
        }else{
            found = found[key];
        }
    });
    return found;
};