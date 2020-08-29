const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  const token = req.header('token')
  if (!token) return res.status(401).json({status: 401, message: 'Auth Error'})
  try {
    const decoded = jwt.verify(token, 'secret')
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(500).send({status: 500, message: 'Invalid Token'})
  }
}

module.exports = authMiddleware
