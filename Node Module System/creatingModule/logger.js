
var url = 'http://mylogger.io';

function log(message) {
    // send an HTTP reques
    console.log(message);
}

module.exports.log = log;
//module.exports.endPoint = url;

/*
if you want to export only the log function not an object then
module.exports = log;

*/