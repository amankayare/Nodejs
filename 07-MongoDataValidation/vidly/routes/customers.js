const express = require('express');
const mongoose = require('mongoose');
const {Customer,validate } = require('../models/customers');

const router = express.Router();


router.get('/', async (req, res) => {


    //get data from database
    const result = await Customer.find().sort("name:1");
    res.status(200).send(result);


});
router.get('/:id', async (req, res) => {

    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('Customer with given id not found');
        return res.status(200).send(customer);

    } catch (error) {
        return res.status(500).send(error.message);
    }


});
router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    try {

        customer = await customer.save();
        console.log('Customer Saved SuccessFully...');
        res.status(200).send(customer);

    } catch (error) {

        res.status(500).send(error.message);
        console.log(error.message);
    }

});
router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!customer) return res.status(404).send('There is no Customer availble with given id');
        return res.status(200).send(customer);
    } catch (error) {

        res.status(500).send(error.message);
        console.log(error.message);

    }


});

router.delete('/:id', async (req, res) => {

    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer) return res.status(404).send('Customer with given id is not found');
        return res.status(200).send(`Customer deleted successfully \n ${customer}`);


    } catch (error) {
        return res.status(500).send(error.message);

    }
});
module.exports = router;