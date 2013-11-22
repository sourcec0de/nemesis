/**
 * Print JSON
 * @param {Object} j -- json to be printed
 * @param {null} o
 * @param {Number} s -- spaces
 */

module.exports = function(j,n,s){
    n = n || null;
    s = s || 4;
    var json = JSON.stringify(j,n,s)
    console.log(json);
};