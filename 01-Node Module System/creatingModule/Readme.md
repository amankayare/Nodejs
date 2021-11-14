
# Create Module



1) Create a file with .js extension( logging.js )
2) Write some code in that file like written below
```
var url = 'http://mylogger.io';

function log(message) {
    // send an HTTP reques
    console.log(message);
}

module.exports.logging = logging;
```
- using ```module.exports.log```, here we are  exporting the code in the form of module.
- if you want to export only the log function not whole object then ```module.exports = log;```
- if you want to export only the Url variable then ```module.exports.endPoint = url;```
