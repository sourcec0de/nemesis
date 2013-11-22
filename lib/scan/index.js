/**
 * nemesis scan
 * ========================
 * Recursivly Scan a directory
 * returns an object containing
 * all modules
 *
 * 
 * Notes:
 *
 *  - add function signature check
 *    only require matching Function.length
 *
 *  - consider async version
 */

var fs = require('fs');
var path = require('path');

var scan = function(loc, obj) {
    obj = obj || {};
    // console.log(loc)
    var stat = fs.lstatSync(loc);
    var isDir = stat.isDirectory();
    if (isDir) {
        var list = fs.readdirSync(loc);
        for (var i = list.length - 1; i >= 0; i--) {
            var item = list[i];
            var itemPath = path.join(loc,item);
            var itemStat = fs.lstatSync(itemPath);
            var itemIsDir = itemStat.isDirectory();
            if(itemIsDir){
                obj[item] = scan(itemPath,obj[item]);
            }else if(item.match(/(.js)/)){
                item = item.split('.js')[0];
                obj[item] = require(itemPath);
            }
        };
    };
    return obj;
};


module.exports = scan;