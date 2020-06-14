/*

Some time  validation logic may involve reading something from a database or
a remote http service in that case we need async validator i.e. asynchronous
validator 


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
        enum: ['web', 'mobile', 'network']
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
        min: 5
    }
});

// Create a model or creating a instance for course
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {

    const course = new Course({

        name: 'Angular JS',
        auther: 'Aman',
        // tags: [],
        // tags: null,
        tags: [],
        isPublished: true,
        category: '-',//invalid 
        price: 7

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

createCourse();

