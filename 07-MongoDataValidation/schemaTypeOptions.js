/*
 *  There are more options or properties available to validate data so
 *  some of are for string and some of are for Numbers 
*/


const mongoose = require('mongoose');

// Data-base connection to remove warning we pass one object along with url string
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => console.log('data-base connected successully... '))
    .catch((err) => console.log(err));


// Defining schema for course document
const courseSchema = new mongoose.Schema({
    //Data string validation code
    name: {
        type: String,
        minlength: 5,
        maxlength: 15,
        // match:/pattern/,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        //Some more options available for string type
        lowercase: true,
        //uppercase:true
        trim: true
    },
    auther: String,
    //custom validation is required becasuse we want that every course should have atleast one tag but only required: is not enough because this also accept an empty array
    // so instead of array an object is needed to validate an array
    // now we are doing some async work in validation so need async validator
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                // return v.length > 0;
                /*some async work . basically reading database value or remote http api should be 
                there but for our understanding we are using setTimeout() asynchronous method 
                */
                setTimeout(() => {
                    const result = (v && v.length > 0);
                    callback(result);

                }, 4000);


            },
            message: 'A course should have atleast one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    //conditional validation like: if isPublished is true only then price would be inserted
    price: {

        type: Number,
        required: function () { return this.isPublished; },
        //number validation
        max: 10,
        min: 5,
        //Some more options available for Number type
        get: v => Math.round(v), // if you read prize then it will read round off value even if stored value is a pointed value in database 
        set: v => Math.round(v)// if you set prize then it will store a round off value in the database 
    }
});

// Create a model or creating a instance for course
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {

    const course = new Course({

        name: 'Angular JS',
        auther: 'Aman',
        tags: ['frontend'],
        isPublished: true,
        category: 'WEB',
        price: 7.5

    });

    try {
        const result = await course.save();
        console.log(result);

    } catch (ex) {
        /*Exception obj have errors object in which all the invalid properties get 
          stored and we can display them individually using for loop
        */
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }


}

//createCourse();

async function getCourses() {

    try {
        const courses = await Course
            .find({ _id: '5edfcb08b43df95e37765f1a' })
            .sort({ name: 1 })
            .select({ name: 1, tags: 1, price: 1 });
        console.log(courses[0].price);

    } catch (ex) {
        /*Exception obj have errors object in which all the invalid properties get 
          stored and we can display them individually using for loop
        */
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

getCourses();