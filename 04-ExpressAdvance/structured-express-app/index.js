require('dotenv').config()
const express = require('express');
const config = require('config');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const logger = require('./middleware/logger');

const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const Joi = require('joi');

const courses = require('./routes/courses');
const home = require('./routes/home');


//built-in middle-ware function
app.use(express.json()); 
app.use(express.static('public'));

//custom middleware function in this file
app.use(function(req , res , next){

    console.log('middleware Authentication function....');
    next();
});

//middle-ware function from other file
app.use(logger);
app.use('/api/courses',courses);
app.use('/',home);

app.use(helmet());
//app.use(morgan('combined'));

// Environments -> devlopment | production
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app env : ${app.get('env')}`);
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('morgan enabled');
  }

// Configuration
console.log('Application Name:'+ config.get('name') );
console.log('Mail Server:'+ config.get('mail.host') );
console.log('Password   :' +config.get('mail.password'));

//Degugging => $export DEBUG=app:startup |  $export DEBUG=app:db
startupDebugger('This debugging is enbaled for startup debugging namespace');
dbDebugger('This debugging is enbaled for database debugging namespace');

// Templating Engines
app.set('view engine','pug');                  
//optional setting for templating
app.set('views','./views'); //=> default path



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}....`));
