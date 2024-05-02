const {Router} = require('express')
const authMiddleware = require('../authMiddleware')

// const poRouter = require('./receipt/poRouter')
// const grRouter = require('./receipt/grRouter')
// const doRouter = require('./receipt/doRouter')
// const soRouter = require('./receipt/soRouter')
// const drRouter = require('./receipt/drRouter')

const receiptRouter = Router()

receiptRouter.use(authMiddleware)

// receiptRouter.use('/purchase_order', poRouter)
// receiptRouter.use('/good_receipt', grRouter)

// receiptRouter.use('/drive_order', doRouter)
// receiptRouter.use('/sales_order', soRouter)
// receiptRouter.use('/delivery_receipt', drRouter)

module.exports = receiptRouter