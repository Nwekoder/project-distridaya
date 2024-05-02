const {Router} = require('express')
const {sign, verify} = require('jsonwebtoken')
const {hash, compare} = require('bcryptjs')
const {client} = require('../db')
const {z} = require('zod')
const authMiddleware = require('../authMiddleware')

const authRouter = Router()
const db = client.db().collection('users')

const UserLoginScheme = z.object({
    username: z.string({required_error: "Must include Username!"}).min(3, "Username should be at least 3 characters!"),
    password: z.string({required_error: "Must include Password"}).min(8, "Password should be at least 8 characters!"),
})

authRouter.post('/login', async(req, res) => {
    try {
        const data = req.body
        UserLoginScheme.parse(data)
        
        await client.connect()
        const findUser = await db.findOne({username: data.username})
        if(!findUser) throw Error("Username is not found!")

        const comparePassword = await compare(data.password, findUser.password)
        if(!comparePassword) throw Error("Wrong password!")

        const token = sign({
            uid: findUser._id,
            username: findUser.username,
            full_name: findUser.full_name
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        await client.close()

        res.json({message: "Success!", token}).status(200)
    } catch (error) {
        if(error.issues) {
            res.status(400).json({message: "Validation error", errors: error.issues.map(issue => issue.message)})
        }else {
            res.status(400).json({message: error.message})
        }
    }
})

authRouter.get('/verify', authMiddleware, async(req,res) => {
    try {
        const authtoken = req.headers['x-tdp-authtoken']

        const payload = verify(authtoken, process.env.JWT_SECRET)

        res.status(200).json({message: "Success!", payload})
    } catch (error) {
        if(error.issues) {
            res.status(400).json({message: "Validation error", errors: error.issues.map(issue => issue.message)})
        }else {
            res.status(400).json({message: error.message})
        }
    }
})

const UserRegistrationScheme = z.object({
    username: z.string({required_error: "Must include Username!"}).min(3, "Username should be at least 3 characters!"),
    password: z.string({required_error: "Must include Password"}).min(8, "Password should be at least 8 characters!"),
    full_name: z.string({required_error: "Must include Full Name!"}).min(1, "Full Name should not be empty!"),
    phone: z.string({required_error: "Must include Phone Number!"}).min(1, "Phone Number should not be empty!"),
    email: z.string({required_error: "Must include Email!"}).email("Email is not valid!").min(1, "Email should not be empty!"),
    address: z.string({required_error: "Must include Address!"}).min(1, "Address should not be empty!"),
})

authRouter.post('/register', async(req,res) => {
    try {
        const data = req.body
        UserRegistrationScheme.parse(data)

        await client.connect()

        const findUniqueUsername = await db.findOne({username: data.username})
        if(findUniqueUsername) throw Error("Username already exists!")
        
        const findUniqueEmail = await db.findOne({email: data.email})
        if(findUniqueEmail) throw Error("Email already used!")

        const findUniquePhone = await db.findOne({phone: data.phone})
        if(findUniquePhone) throw Error("Phone number already used!")

        const hashed_pw = await hash(data.password, 12)
        await db.insertOne({
            ...data,
            password: hashed_pw,
            updatedAt: new Date()
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

module.exports = authRouter