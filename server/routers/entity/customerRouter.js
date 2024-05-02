const {Router} = require('express')
// const {client} = require('../../db')
// const {z} = require('zod')

const customerRouter = Router()
// const db = client.db().collection('customers')

// Get All Customer
customerRouter.get('/', async(req,res) => {
    res.status(200).json({message: "TBA"})
})

// Add new Customer
customerRouter.post('/', async(req,res) => {
    res.status(200).json({message: "TBA", id_customer: req.params.id_customer})
})

// Get a Customer by ID
customerRouter.get('/:id_customer', async(req,res) => {
    res.status(200).json({message: "TBA", id_customer: req.params.id_customer})
})

// Update Customer by ID
customerRouter.patch('/:id_customer', async(req,res) => {
    res.status(200).json({message: "TBA", id_customer: req.params.id_customer})
})

// Delete Customer by ID
customerRouter.delete('/:id_customer', async(req,res) => {
    res.status(200).json({message: "TBA", id_customer: req.params.id_customer})
})

module.exports = customerRouter