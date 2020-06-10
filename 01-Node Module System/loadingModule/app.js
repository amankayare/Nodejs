/*  
   1) To Load a module we use :-

    require(''); => function available in node only not in browsers
    
    require('./logger.js'); => if module is present in current folder
                    OR
    require('./logger'); => if module is present in current folder
                    
    require('./subFolder/logger'); => if module is present in sub folder

    require('../logger'); => if module is present in parent folder

    require('http'); => if module is builtin module

    2) Tool to check errors like const , var errors we use JsHint to prevent 
       run time errors.
       cmd - jshint app.js 

*/

// var logger = require('./logger');
// logger = 1; use JsHint to check runtime errors at compile time 
const logger = require('./logger');

logger.log('Hello');

/*
if only log function is exported then

const log = require('./logger');
log('hello');

*/