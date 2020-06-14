const Joi = require('joi');
const mongoose = require('mongoose');

// create schema
const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 10,
        required: true
    }
});
//create model
const Genre = mongoose.model('Genre', genresSchema);


function validateGenre(genre) {

    const scheme = {

        name: Joi.string().required().min(3)
    };

    return Joi.validate(genre, scheme);

}

exports.validate = validateGenre;
exports.Genre = Genre;