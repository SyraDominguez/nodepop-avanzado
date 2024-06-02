const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');

const router = express.Router();

// User
const users = [
  {
    email: 'user@example.com',
    password: bcrypt.hashSync('1234', 10),
  }
];

// Ruta para autenticar
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User Not Found 😕' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign({ email: user.email }, config.jwtSecret, {
      expiresIn: config.jwtExpire,
    });

    res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid Credentials' });
  }
});

module.exports = router;
