const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Customer , validate} = require('../../models/customer');


//api to get all customers
router.get('/', async (req, res) => {
    console.log('customer get')
    const customers = await Customer.find().sort('name');
    res.send(customers);
});


//api to create a customer
router.post('/', async (req, res) => {
    console.log('create a customer called');
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let customer = new Customer({
         name: req.body.name,
         isGold: req.body.isGold,
         phone: req.body.phone,
        });
    customer = await customer.save();
    res.send(customer);

});


//api to get single customers
router.get('/:id', async (req, res) => {
    console.log('get customer for id');
    const customer = await Customer.findById(req.params.id);
    if (!customer)
        return res.status(400).send('The Customer with given Id does not exits.')
});


//api to update a customer
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone,
        }, { new: true });
    if (!customer)
        return res.status(400).send('The customer with given Id does not exits.')

    res.send(customer);
});

//api to delete a customer
router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
        return res.status(400).send('The customer with given Id does not exits.')

    res.send(customer);
})



module.exports = router;