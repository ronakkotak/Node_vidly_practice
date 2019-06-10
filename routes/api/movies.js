const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {Movie , validate} = require('../../models/movie');
const {Genre} = require('../../models/genre');

//api to get all movies
router.get('/', async (req, res) => {
    console.log('genres get')
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

//api to create a movies
router.post('/', async (req, res) => {
    console.log('create a movies called');
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);


    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send("Invalid genre.");

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.bodydailyRentalRate
    })

    movie = movie.save();
});

// //api to get single movies
// router.get('/:id', async (req, res) => {
//     console.log('get genre for id');
//     const genre = await Genre.findById(req.params.id);
//     if (!genre)
//         return res.status(400).send('The genre with given Id does not exits.')
// });



// //api to update a movies
// router.put('/:id', async (req, res) => {
//     const { error } = validate(req.body);
//     if (error)
//         return res.status(400).send(error.details[0].message);

//     const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
//     if (!genre)
//         return res.status(400).send('The genre with given Id does not exits.')

//     res.send(genre);
// });

// //api to delete a movies
// router.delete('/:id', async (req, res) => {

//     const genre = await Genre.findByIdAndRemove(req.params.id);
//     if (!genre)
//         return res.status(400).send('The genre with given Id does not exits.')

//     res.send(genre);
// })



module.exports = router;