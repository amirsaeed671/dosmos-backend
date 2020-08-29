const express = require('express')
const getUserRoutes = require('./user')
const getInfoRoutes = require('./info')

function getRouter() {
  const router = express.Router()
  router.use('/user', getUserRoutes())
  router.use('/info', getInfoRoutes())
  return router
}

module.exports = getRouter
