require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user')
const cors = require('cors')
const connectDB = require('./db/config')
const auth = require('./middleware/auth')
const app = express()

// experss middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(auth)

const port = process.env.PORT || 3000

app.use('/user', user)

connectDB(() => {
  app.listen(port, () => {
    console.log('App listening on port : ', port)
  })
})
