const express = require('express')
const cors = require('cors')
const authRouter = require('./routers/authRouter')
const entityRouter = require('./routers/entityRouter')
const receiptRouter = require('./routers/receiptRouter')

const app = express()

console.clear()
app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/entity', entityRouter)
app.use('/receipt', receiptRouter)

app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}!`))