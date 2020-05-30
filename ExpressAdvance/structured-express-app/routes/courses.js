const express = require('express');
const router = express.Router();


const courses = [
    { id: 1, name: "NodeJS" },
    { id: 2, name: "ReacJS" },
    { id: 3, name: "VueJS" }
];

router.get('/', (req, res) => {

    res.send(courses);
});
router.get('/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('Genre with given id id not found');
    res.send(course);

});
router.post('/', (req, res) => {

    const { error } = validateCourse(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
});
router.put('/:id', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with given id is not found');

    course.name = req.body.name;
    return res.send(courses);
});

router.delete('/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with given id is not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return res.send(courses);
});


function validateCourse(course) {

    const scheme = {

        name: Joi.string().required().min(3)
    };

    return Joi.validate(course, scheme);

}


module.exports = router;