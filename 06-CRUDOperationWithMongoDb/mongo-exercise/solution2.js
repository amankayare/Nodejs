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

/*  Q  -Get all the published backend and frontend courses 
       -Sort them by their price in descending order
       -Pick only name and auther
       -Display them 
*/
async function getCourses() {

    return await Course
        .find({ isPublished: true })
        .or([{ tags: 'frontend' }, { tags: 'backend' }])
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 });


}
async function display() {

    const result = await getCourses();
    console.log(result);
}

display();
