const {check} = require('express-validator')
const authMiddleware = require('../middleware/auth')
const {
  signupController,
  loginController,
  profileController,
} = require('../controllers/user')

function getUserRoutes() {
  const userRoutes = require('express').Router()

  userRoutes.post(
    '/signup',
    [
      check('username', 'Please Enter a Valid Username').not().isEmpty(),
      check('password', 'Please enter a valid password').isLength({
        min: 8,
      }),
    ],
    signupController,
  )

  userRoutes.post(
    '/login',
    [
      check('username', 'Please enter a valid username').notEmpty(),
      check('password', 'Please enter correct password').notEmpty().isLength({
        min: 8,
      }),
    ],
    loginController,
  )

  userRoutes.get('/me', authMiddleware, profileController)

  return userRoutes
}

module.exports = getUserRoutes
