require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const getRouter = require('./routes/index')
const cors = require('cors')
const connectDB = require('./db/config')
const app = express()

// express middlewares
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.use('/', getRouter())

connectDB(() => {
  app.listen(port, () => {
    console.log('App listening on port : ', port)
  })
})
