require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user')
const cors = require('cors')
const connectDB = require('./db/config')
const app = express()

// experss middlewares
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.use('/user', user)

connectDB(() => {
  app.listen(port, () => {
    console.log('App listening on port : ', port)
  })
})
