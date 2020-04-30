const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const passCode = process.env.PASSCODE;

router.post('/login', (req, res) => {
  const { password, username } = req.body;

  if (bcrypt.compareSync(password, bcrypt.hashSync(passCode, 12)) && username === 'admin') {
    const token = generateToken();
    res.status(200).json({
      message: `Successful login`,
      token
    })
  } else {
    res.status(401).json({
      message: "incorrect username or password",
    })
  }
})

function generateToken() {
  const payload = {
    sub: 'token',
    jwtid: '8728391',
    admin: true
  };

  const options = {
    expiresIn: '1d', 
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;