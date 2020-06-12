const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const passCode = process.env.PASSCODE;
const users = require('../users/usersModel');

router.post('/register', (req, res) => {  
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  console.log('hash', bcrypt.hashSync(user.password, 12));
  user.password = hash;

  if (user.username === 'admin') {
    res.status(401).json({
      message: "Unable to register as Admin",
    })
    return;
  }

  users.add(user)
    .then(savedUser => {
      const token = generateToken(savedUser);
      const { username, name, phone, email } = savedUser
      res.status(201).json({ 
        username,
        name,
        phone,
        email, 
        token
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  // These users are seeded for dev purposes
  const developmentUsers = {
    rayallen: 'rayallen',
    antonwilson: 'antonwilson',
    ahmadrashad: 'ahmadrashad',
    elimeed: 'elimeed',
    anna: 'anna',
  }

  if (username === 'admin') {
    res.status(401).json({
      message: "Unable to login as Admin",
    })
    return;
  }

  users.findBy({ username })
    .then(user => {
      const authPassword = developmentUsers[username] === username
        ? true 
        : bcrypt.compareSync(password, user.password);
      if (user && authPassword) {
        console.log('user', user);
        const token = generateToken(user);
        const { username, name, phone, email } = user
        res.status(200).json({
          username,
          name,
          phone,
          email,
          token,
        })
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/admin', (req, res) => {
  const { password, username } = req.body;

  if (bcrypt.compareSync(password, bcrypt.hashSync(passCode, 12)) && username === 'admin') {
    const token = generateToken({ username, id: 0 });
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

function generateToken(user) {
  const payload = {
    sub: user.id,
    id: user.id,
    role: user.username === 'admin' ? 'admin' : 'user',
    username: user.username
  };

  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;