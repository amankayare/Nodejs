const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Romance" }
];

router.get('/', (req, res) => {

    res.send(genres);
});
router.get('/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('Genre with given id id not found');
    res.send(genre);

});
router.post('/',(req,res)=>{

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
router.put('/:id',(req,res)=>{
    
    const {error}= validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre with given id is not found');

    genre.name = req.body.name;
    return res.send(genres);
});

router.delete('/:id',(req,res)=>{

    const genre = genres.find(c=> c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre with given id is not found');

    const index = genres.indexOf(genre);
    genres.splice(index,1);
    return res.send(genres);
});

function validateGenre(genre){

    const scheme = {

        name: Joi.string().required().min(3)
    };

   return Joi.validate(genre,scheme);

}

module.exports = router;