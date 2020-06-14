const express = require('express');
const mongoose = require('mongoose');

const genres = require('./routes/genres');
const customers = require('./routes/customers');

require('dotenv').config();
const app = express();
const Joi = require('joi');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);


mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Vidly database connected successfully...'))
    .catch((error) => console.log(error.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}....`));

