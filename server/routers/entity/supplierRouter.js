const {Router} = require('express')
const {client} = require('../../db')
const {z} = require('zod')
const { ObjectId } = require('mongodb')

const supplierRouter = Router()
const db = client.db().collection('suppliers')

// Get All Supplier
supplierRouter.get('/', async(req,res) => {
    await client.connect()
    const suppliers = await db.find({}).toArray()
    await client.close()
    
    res.status(200).json({message: "Success!", data: suppliers})
})

// Add new Supplier
supplierRouter.post('/', async(req,res) => {
    try {
        const data = req.body
        const schema = z.object({
            name: z.string(),
            npwp: z.string().optional(),
            city: z.string(),
            address: z.string(),
            phone: z.string(),
            email: z.string().optional(),
            fax: z.string().optional(),
        })

        const validate = schema.parse(data)

        await client.connect()

        await db.insertOne({
            name: validate.name,
            npwp: validate.npwp,
            city: validate.city,
            address: validate.address,
            phone: validate.phone,
            email: validate.email,
            fax: validate.fax,
        })

        await client.close()
        
        res.status(200).json({message: "Success!"})
    } catch (error) {
        if(error.issues) {
            res.status(400).json({message: "Validation error", errors: error.issues.map(issue => issue.message)})
        }else {
            res.status(400).json({message: error.message})
        }
    }

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
    try {
        const supplier_id = req.params.id_supplier

        await client.connect()
        await db.deleteOne({_id: new ObjectId(supplier_id)})
        await client.close()

        res.status(200).json({message: "Success!"})
    } catch (error) {
        if(error.issues) {
            res.status(400).json({message: "Validation error", errors: error.issues.map(issue => issue.message)})
        }else {
            res.status(400).json({message: error.message})
        }
        console.error(error)
    }
})

module.exports = supplierRouter