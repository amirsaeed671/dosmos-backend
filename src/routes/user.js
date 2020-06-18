const {check, validationResult} = require('express-validator')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../db/models/user')

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
        errors: errors.array(),
      })
    }

    const {username, password} = req.body

    try {
      let user = await User.findOne({username})
      if (user) {
        return res.status(400).json({
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
      res.status(500).send('Error in Saving')
    }
  },
)

module.exports = router
