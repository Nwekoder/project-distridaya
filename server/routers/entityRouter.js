const {Router} = require('express')
const authMiddleware = require('../authMiddleware')
const supplierRouter = require('./entity/supplierRouter')
const customerRouter = require('./entity/customerRouter')
const salesRouter = require('./entity/salesRouter')

const entityRouter = Router()

entityRouter.use(authMiddleware)
entityRouter.use('/supplier', supplierRouter)
entityRouter.use('/customer', customerRouter)
entityRouter.use('/sales', salesRouter)

module.exports = entityRouter