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
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                // return v.length > 0;
                return v && v.length > 0;
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
        tags:[],
        isPublished: true,
        category: 'web',
        price: 7

    });

    try {
        const result = await course.save();
        console.log(result);

    } catch (error) {
        console.log(error.message);
    }


}

createCourse();

