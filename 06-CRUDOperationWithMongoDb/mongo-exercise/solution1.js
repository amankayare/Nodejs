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

//Create a course

async function createCourse() {

    const course = new Course({

        name: 'Discord.Js',
        tags: ['discord','server'],
        author: 'Aman',
        isPublished: false,
        price: 100

    });

    const result = course.save();
    console.log(result);

}

//createCourse();

/*  Q1. -Get all the published backend courses
        -Sort them by their name
        -pick only their name and auther
        -Display them
*/
async function getCourses(){

    return await Course 
                    .find({ isPublished: true , tags: 'backend'})
                    .sort( { name:1 } )
                    .select( { name:1 , author:1 } );


}
async function display(){

    const result = await getCourses();
    console.log(result);
}

display();
