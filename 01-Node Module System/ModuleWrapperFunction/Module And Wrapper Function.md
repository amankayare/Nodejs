
# Module And Module Wrapper Function



## Module
- To Load a module we use 
```
require(''); => function available in node only not in browsers
    
require('./logger.js'); => if module is present in current folder
                    
                    OR

require('./logger'); => if module is present in current folder
                    
require('./subFolder/logger'); => if module is present in sub folder

require('../logger'); => if module is present in parent folder
```
-  Tool to check errors like const , var errors we use JsHint to prevent 
    run time errors.

```
cmd > jshint app.js 
```
 
 ```var logger = require('./logger');\
 logger = 1;
 ```
 - use JsHint to check runtime errors at compile time 


```
const logger = require('./logger');
logger.log('Hello');
```

## Module Wrapper Function

```
console.log(`file = ${__filename}`);
console.log(`directory = ${__dirname}`);

var url = 'http://mylogger.io';

function log(message) {
    // send an HTTP reques
    console.log(message);
}

module.exports.log = log;
```
- Internally each module is wrapped into an Module Wrapper Function i.e.
```
 (function (exports,require,module,__filename,__dirname){
    
    
 })
```
-  so at runtime our code will look like this :-
```
(function (exports,require,module,__filename,__dirname){
            
        var url = 'http://mylogger.io';
        
        function log(message) {
            // send an HTTP reques
            console.log(message);
        }
        module.exports.log = log;
    
    })
```