const mongoose = require('mongoose')

const db_uri = process.env.DB_URI

const connectDB = callback => {
  mongoose.connect(
    db_uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    err => {
      if (err) {
        console.log('DB connection failed')
      } else {
        callback()
      }
    },
  )
}

module.exports = connectDB
