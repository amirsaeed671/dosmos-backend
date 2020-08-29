const {picOfDayController, galleryController} = require('../controllers/info')
const authMiddleware = require('../middleware/auth')

function getInfoRoutes() {
  const infoRoutes = require('express').Router()

  infoRoutes.get('/picture-of-day', authMiddleware, picOfDayController)

  infoRoutes.get('/gallery', authMiddleware, galleryController)

  return infoRoutes
}

module.exports = getInfoRoutes
