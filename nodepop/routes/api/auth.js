const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');
const User = require('../../models/User');

const router = express.Router();

// Simular una base de datos de usuarios
const users = [
  {
    email: 'user@example.com',
    password: bcrypt.hashSync('1234', 10),
  }
];

// Ruta para autenticar
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario en la matriz de usuarios
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  // Compara la contraseña
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign({ email: user.email }, config.jwtSecret, {
      expiresIn: config.jwtExpire
    });

    res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
