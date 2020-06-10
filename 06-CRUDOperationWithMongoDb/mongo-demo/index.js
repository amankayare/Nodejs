const mongoose = require('mongoose');

// Data-base connection
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('data-base connected successully... '))
    .catch((err) => console.log(err));


// Defining schema for course document
const courseSchema = new mongoose.Schema({
    name: String,
    auther: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean

});

// Create a model or creating a instance for course
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {

    const course = new Course({

        name: 'Angular JS',
        auther: 'Aman',
        tags: ['angular', 'frontend'],
        isPublished: true


    });
    const result = await course.save();
    console.log(result);

}

//createCourse();


// Querying data from database
async function getCourses() {

    //const result = await Course.find();

    // const result = await Course.find({auther:'Mosh',isPublished:true});

    /* const result = await Course
                   .find()
                   .sort({auther:1});
    */

    /*
      const result = await Course
                   .find()
                   .sort({name:1})
                   .select({name:1,tags:1});
    */


    const result = await Course
        .find()
        .limit(2)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(result);

}

//getCourses();

// get count
async function countCourses() {


    const result = await Course.countDocuments();
    console.log(result);

}
//countCourses();


async function countParticularCourses() {


    const result = await Course
        .find({ price: { $in: [10, 15, 20] } })
        .count();

    console.log(result);
}
//countParticularCourses();   

//update using Query first approch

async function updateQueryFirst(id) {

    const course = await Course.findById(id);
    if (!course) {
        console.log('no data');
        return;
    }
    course.set({

        name: 'Nest.js',
        author: 'Another'
    });
    /*
        course.name = 'updatedName';
        course.auther = 'Another auther';
    */
    const result = await course.save();
    console.log(result);
}

updateQueryFirst('5edf76cf44feb022db195e93');

async function updateUpdateFirst1(id) {

    const result = await Course.update({ _id: id }, {

        $set: {
            auther: 'Another',
            name: 'Nest.js'
        }
    });

    console.log(result);

}

//updateUpdateFirst1('5edf76cf44feb022db195e93');

async function updateUpdateFirst2(id) {

    const course = await Course.findByIdAndUpdate(id, {

        
        $set: {
            auther: 'Another auther 2',
            name: 'Angular-JS'
        }
    }, { new: true });

    console.log(course);

}

//updateUpdateFirst2('5edf76cf44feb022db195e93');



// delete a document from database
async function deleteCourse(id) {
    console.log('ID: ' + id);
    const result = await Course.deleteOne({ _id: id });
    console.log(result);

}
//deleteCourse('5edf75a5e23b2b2225d119b0');
