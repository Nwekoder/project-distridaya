const {Router} = require('express')
// const {client} = require('../../db')
// const {z} = require('zod')

const supplierRouter = Router()
// const db = client.db().collection('suppliers')

// Get All Supplier
supplierRouter.get('/', async(req,res) => {
    res.status(200).json({message: "TBA"})
})

// Add new Supplier
supplierRouter.post('/', async(req,res) => {
    res.status(200).json({message: "TBA", id_supplier: req.params.id_supplier})
})

// Get a Supplier by ID
supplierRouter.get('/:id_supplier', async(req,res) => {
    res.status(200).json({message: "TBA", id_supplier: req.params.id_supplier})
})

// Update Supplier by ID
supplierRouter.patch('/:id_supplier', async(req,res) => {
    res.status(200).json({message: "TBA", id_supplier: req.params.id_supplier})
})

// Delete Supplier by ID
supplierRouter.delete('/:id_supplier', async(req,res) => {
    res.status(200).json({message: "TBA", id_supplier: req.params.id_supplier})
})

module.exports = supplierRouter