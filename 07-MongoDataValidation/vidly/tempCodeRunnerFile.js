
app.use('/api/customers', customers);


mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Vidly database connected successfully...'))
    .catch((error) => console.log(error.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}....`));

