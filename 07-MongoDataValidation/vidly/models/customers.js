const mongoose = require('mongoose');
const Joi = require('joi');

// create schema
const customersSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 30,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 10,
        required: true
    },

});
//create model
const Customer = mongoose.model('Customer', customersSchema);

function validateCustomer(customer) {

    const scheme = {

        name: Joi.string().required().min(5).max(50),
        phone: Joi.string().required().min(3).max(50),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, scheme);

}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;