const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Database mongo-exercises connected successully'))
    .catch((err) => console.log(err));

const courseSchema = mongoose.Schema({

    name: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    author: String,
    isPublished: Boolean,
    price: Number


});

const Course = mongoose.model('Course', courseSchema);

/*  Q1. -Get all the published courses that are 15$ or more ,or have the word 'by' in
         their name
*/
async function getCourses() {

    return await Course
        .find({isPublished:true})
        .or([{ price: { $gte: 15 } }, { name: /.*by*./i }])
        .select({ name: 1, price: 1 });

}
async function display() {

    const result = await getCourses();
    console.log(result);
}

display();
