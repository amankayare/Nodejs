const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Genre, validate } = require('../models/genres');

router.get('/', async (req, res) => {


    //get data from database
    const result = await Genre.find().sort("name:1");
    res.status(200).send(result);


});
router.get('/:id', async (req, res) => {

    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('Genre with given id not found');
        return res.status(200).send(genre);

    } catch (error) {
        return res.status(500).send(error.message);
    }


});
router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });

    try {

        genre = await genre.save();
        console.log('Genre Saved SuccessFully...');
        res.status(200).send(genre);

    } catch (error) {

        res.status(500).send(error.message);
        console.log(error.message);
    }

});
router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!genre) return res.status(404).send('There is no genre availble with given id');
        return res.status(200).send(genre);
    } catch (error) {

        res.status(500).send(error.message);
        console.log(error.message);

    }


});

router.delete('/:id', async (req, res) => {

    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) return res.status(404).send('Genre with given id is not found');
        return res.status(200).send(`Genres deleted successfully \n ${genre}`);


    } catch (error) {
        return res.status(500).send(error.message);

    }
});


module.exports = router;