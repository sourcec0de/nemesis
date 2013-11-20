/**
 * Print JSON
 * @param {Object} j -- json to be printed
 * @param {null} o
 * @param {Number} s -- spaces
 */

module.exports = function(j,o,s){
    s = s || 4;
    o = o || null;
    console.log(JSON.stringify(j,o,s));
};