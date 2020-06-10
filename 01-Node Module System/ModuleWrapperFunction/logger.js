//var x =;

console.log(`file = ${__filename}`);
console.log(`directory = ${__dirname}`);

var url = 'http://mylogger.io';

function log(message) {
    // send an HTTP reques
    console.log(message);
}

module.exports.log = log;

/* # Internally each module is wrapped into an Module Wrapper Function i.e.

    (function (exports,require,module,__filename,__dirname){

    })

    # so at runtime our code will look like this :-

    (function (exports,require,module,__filename,__dirname){
            
        var url = 'http://mylogger.io';
        
        function log(message) {
            // send an HTTP reques
            console.log(message);
        }

        module.exports.log = log;
    
    })
*/