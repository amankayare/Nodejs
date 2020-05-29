require('dotenv').config()
const express = require('express');
const config = require('config');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const logger = require('./logger');// import middleware function
        
const helmet = require('helmet');// third party middleware function
const morgan = require('morgan');// third party middleware function


const app = express();
const Joi = require('joi');

//built-in middle-ware function
app.use(express.json()); // adding middle-ware layar => if req. obj is json, it will add req.body property into it.
app.use(express.static('public'));

//middleware function in this file
app.use(function(req , res , next){

    console.log('middleware Authentication function....');
    next();
});

//middle-ware function from other file
app.use(logger);

//middle-ware function from third party ->, $ npm i <helmet>, $ npm i <helmet>
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


const courses = [
    { id: 1, name: "NodeJS" },
    { id: 2, name: "ReacJS" },
    { id: 3, name: "VueJS" }
];

app.get('/',(req,res)=>{
   
    res.render('index' , {title:'Application',message:'Welcome To Express-App'});

});
app.get('/api/courses', (req, res) => {

    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('Genre with given id id not found');
    res.send(course);

});
app.post('/api/courses',(req,res)=>{

     const {error} = validateCourse(req.body);

     if(error)
     return res.status(400).send(error.details[0].message);

     const course ={
         id: courses.length + 1,
         name: req.body.name
     }
     courses.push(course);
     res.send(courses);
});
app.put('/api/courses/:id',(req,res)=>{
    
    const {error}= validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given id is not found');

    course.name = req.body.name;
    return res.send(courses);
});

app.delete('/api/courses/:id',(req,res)=>{

    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given id is not found');

    const index = courses.indexOf(course);
    courses.splice(index,1);
    return res.send(courses);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}....`));

function validateCourse(course){

        const scheme = {

            name: Joi.string().required().min(3)
        };

       return Joi.validate(course,scheme);

}