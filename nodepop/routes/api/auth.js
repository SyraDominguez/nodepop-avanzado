const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');
const User = require('../../models/User');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const lang = req.getLocale();

  // Buscar el usuario en la base de datos
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: req.__('errors.user_not_found') });
  }

  // Compara la contraseña
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign({ email: user.email }, config.jwtSecret, {
      expiresIn: config.jwtExpire
    });

    res.json({ token });
  } else {
    return res.status(401).json({ message: req.__('errors.invalid_credentials') });
  }
});

module.exports = router;
