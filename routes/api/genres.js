const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const {Genre , validate} = require('../../models/genre');

//api to get all genres
router.get('/', async (req, res) => {
    console.log('genres get')
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

//api to get single genres
router.get('/:id', async (req, res) => {
    console.log('get genre for id');
    const genre = await Genre.findById(req.params.id);
    if (!genre)
        return res.status(400).send('The genre with given Id does not exits.')
});

//api to create a genre
router.post('/', async (req, res) => {
    console.log('create a genre called');
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);

});

//api to update a genre
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre)
        return res.status(400).send('The genre with given Id does not exits.')

    res.send(genre);
});

//api to delete a genre
router.delete('/:id', async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
        return res.status(400).send('The genre with given Id does not exits.')

    res.send(genre);
})



module.exports = router;