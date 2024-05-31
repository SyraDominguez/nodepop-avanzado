const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1] || req.query.token;

  if (!token) {
    return res.status(401).json({ message: req.__('errors.access_token_required') });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: req.__('errors.invalid_token') });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
