const {check, validationResult} = require('express-validator')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../db/models/user')
const auth = require('../middleware/auth')

router.post(
  '/signup',
  [
    check('username', 'Please Enter a Valid Username').not().isEmpty(),
    check('password', 'Please enter a valid password').isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array(),
      })
    }

    const {username, password} = req.body

    try {
      let user = await User.findOne({username})
      if (user) {
        return res.status(400).json({
          status: 400,
          message: 'User already exist',
        })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      user = new User({username, password: hashedPassword})

      await user.save()

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(payload, 'randomString', {expiresIn: 10000}, (err, token) => {
        if (err) {
          throw err
        }
        res.status(201).json({
          status: 201,
          message: 'User successfuly created',
          data: {
            id: user.id,
            username: user.username,
            token,
          },
        })
      })
    } catch (error) {
      res.status(500).json({status: 500, message: 'Error in Saving'})
    }
  },
)

router.post(
  '/login',
  [
    check('username', 'Please enter a valid username').notEmpty(),
    check('password', 'Please enter correct password').notEmpty().isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array,
      })
    }

    const {username, password} = req.body

    try {
      const user = await User.findOne({username})

      if (!user) {
        return res.status(400).json({
          status: 400,
          message: 'User does not exist',
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid Password',
        })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        'secret',
        {
          expiresIn: 10000,
        },
        (error, token) => {
          if (error) {
            throw error
          }
          return res.status(200).json({
            status: 200,
            message: 'User logged in',
            data: {
              id: user.id,
              username: user.username,
              token,
            },
          })
        },
      )
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Server Error',
      })
    }
  },
)

router.get('/me', auth, async (req, res) => {
  try {
    const {username, _id, createdAt} = await User.findById(req.user.id)
    res.status(200).json({
      status: 200,
      data: {
        _id,
        username,
        createdAt,
      },
    })
  } catch (e) {
    res.status(400).send({status: 400, message: 'Error in Fetching user'})
  }
})

module.exports = router
