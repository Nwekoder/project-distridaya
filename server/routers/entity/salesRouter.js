const {Router} = require('express')
// const {client} = require('../../db')
// const {z} = require('zod')

const salesRouter = Router()
// const db = client.db().collection('sales')

// Get All Sales
salesRouter.get('/', async(req,res) => {
    res.status(200).json({message: "TBA"})
})

// Add new Sales
salesRouter.post('/', async(req,res) => {
    res.status(200).json({message: "TBA", id_sales: req.params.id_sales})
})

// Get a Sales by ID
salesRouter.get('/:id_sales', async(req,res) => {
    res.status(200).json({message: "TBA", id_sales: req.params.id_sales})
})

// Update Sales by ID
salesRouter.patch('/:id_sales', async(req,res) => {
    res.status(200).json({message: "TBA", id_sales: req.params.id_sales})
})

// Delete Sales by ID
salesRouter.delete('/:id_sales', async(req,res) => {
    res.status(200).json({message: "TBA", id_sales: req.params.id_sales})
})

module.exports = salesRouter