const express = require('express');
const router = express.Router();
const genreData = require('../../genreData');

const uuid = require('uuid');
//get constant json


//api to get all genres
router.get('/', (req, res) => {
    console.log('genres get')
    res.json(genreData);
});

//api to get single genres
router.get('/:id', (req, res) => {
    console.log('get genre for id');
    let recordFound = genreData.some(genre => genre.id === parseInt(req.params.id));
    if (recordFound) {
        res.send(genreData.filter(genre => {
            return genre.id === parseInt(req.params.id);
        }))
    } else {
        res.status(400).json({ msg: `No genre found with id ${req.params.id}` })
    }
});

//api to create a genre
router.post('/', (req, res) => {
    console.log('create a genre called');
    const newGenre = { id: uuid.v4(), 'name': req.body.name };
    if(!newGenre.name){
        return res.status(400).json({ msg: 'Please include all fields' })
    }else{
        genreData.push(newGenre);
        res.json(genreData);
    }
});

//api to update a genre

router.put('/' , (req , res) =>{
    let recordFound = genreData.some(genre =>{genre.id === parseInt(req.params.id)});
    if(recordFound){
        const genreToUpdate = req.body;
        genreData.forEach(genre => {
            if (genre.id === parseInt(req.params.id)) {
                genre.name = genreToUpdate.name ? genreToUpdate.name : genre.name;
                res.json({ msg: 'genre update', genre: genre })
            }
        })
    }else{
        res.status(400).json({ msg: `No memeber found with id : ${req.params.id}` });
    }
})



module.exports = router;