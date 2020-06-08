const Users = require('./usersModel');
//onst authenticate = require('../auth/authenticate');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    if (users) {
      res.json(users)
    }
  } catch (error) {
    res.status(500).json({ error, message: "Internal error" })
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Unable to get user with given id' });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Internal Error" });
  }
});

router.post('/', async (req, res) => {
  const userData = req.body;

  try {
    const user = await Users.add(userData);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: 'Unable to post user with given id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const user = await Users.findById(id);
    if (user) {
      const updatedUser = await Users.update(changes, id);
      if (updatedUser) {
        res.json(updatedUser)
      }
    } else {
      res.status(404).json({ message: 'Unable to find user with given id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const removedUser = await Users.remove(id);
    if (removedUser) {
      res.json({ removedUser });
    } else {
      res.status(404).json({ message: 'Unable to remove user with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Error' });
  }
});

module.exports = router;



