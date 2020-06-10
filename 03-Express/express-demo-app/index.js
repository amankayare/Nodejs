const express = require('express');
const app = express();
app.use(express.json()); // adding middle ware layar
const Joi = require('joi');
const courses = [
    { id: 1, name: 'React' },
    { id: 2, name: 'Node' },
    { id: 3, name: 'Javascript' }
];

/* GET METHOD */
app.get('/', (req, res) => {

    res.send('<h1>Welcome to our project!!!</h1>');

});

// http:5000/api/courses
app.get('/api/courses', (req, res) => {

    res.send(courses);

});

// localhost:5000/api/courses/10
app.get('/api/courses/:id', (req, res) => {

    res.send(req.params);
    // res.send(req.params.id);
});
//localhost:5000/api/post/2020/01
app.get('/api/post/:year/:month', (req, res) => {

    res.send(req.params);
    //res.send(req.params.year);
    //res.send(req.params.month);

});
/*Query Parameters
// localhost:5000/api/post/2020/01?sortBy=name
app.get('/api/post/:year/:month', (req, res) => {

    res.send(req.query);
   
});
*/
app.get('/api/coursesByid/:id', (req, res) => {

    const found = courses.find(c => c.id === parseInt(req.params.id));
    console.log(found);
    if (found)
        res.send(courses);
    else
        res.status(404).send('The course with given id is not found');
});


/* POST METHOD */
//localhost:5000/api/courses
app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    console.log('test');

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    res.sendStatus(200);
    courses.push(course);
    console.log(courses);


});

/* PUT METHOD */
app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given id is not found..')
    //validate request data by creating a new generic function called 'validateCourse'
    const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); // {error} => result.error
    if (error) {

        return res.status(400).send(error.details[0].message);
    }
    course.name = req.body.name;
    console.log(courses);
    res.send(course);

});
/* DELETE METHOD */
app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given id is not found..')

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}.....`));

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}