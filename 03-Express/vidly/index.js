const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Romance" }
];

app.get('/api/genres', (req, res) => {

    res.send(genres);
});
app.get('/api/genres/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('Genre with given id id not found');
    res.send(genre);

});
app.post('/api/genres',(req,res)=>{

     const {error} = validateGenre(req.body);

     if(error)
     return res.status(400).send(error.details[0].message);

     const genre ={
         id: genres.length + 1,
         name: req.body.name
     }
     genres.push(genre);
     res.send(genres);
});
app.put('/api/genres/:id',(req,res)=>{
    
    const {error}= validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre with given id is not found');

    genre.name = req.body.name;
    return res.send(genres);
});

app.delete('/api/genres/:id',(req,res)=>{

    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre with given id is not found');

    const index = genres.indexOf(genre);
    genres.splice(index,1);
    return res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening at port ${port}....'));

function validateGenre(genre){

        const scheme = {

            name: Joi.string().required().min(3)
        };

       return Joi.validate(genre,scheme);

}