const Trips = require('./tripsModel');
const authenticate = require('../auth/authenticate');
const router = require('express').Router();

router.get('/', authenticate, async (req, res) => {
  const { role, username } = req.decodedToken;
  let trips;

    try {
      trips = username === 'admin' && role === 'admin'
        // if admin, return every trip 
        ? await Trips.find()
        // otherwise
        : await Trips.findBy({ username })
      if (trips) {
        res.json(trips)
      }
    } catch (error) {
      res.status(500).json({error, message: "Internal error"})
    }
  } 
);

router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trips.findById(id);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ message: 'Unable to get trip with given id'});
    }
  } catch (error) {
    res.status(500).json({error, message: "Internal Error"});
  }
});

router.post('/', async (req, res) => {
  const tripData = req.body;
  try {
    const trip = await Trips.add(tripData);
    if (trip) {
      res.status(201).json(trip);
    } else {
      res.status(404).json({ message: 'Unable to post trip with given id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const trip = await Trips.findById(id);
    if (trip) {
      const updatedTrip = await Trips.update(changes, id);
      if (updatedTrip) {
        res.json(updatedTrip)
      }
    } else {
      res.status(404).json({ message: 'Unable to find trip with given id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Error' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const removedTrip = await Trips.remove(id);
    if (removedTrip) {
      res.json({ removedTrip });
    } else {
      res.status(404).json({ message: 'Unable to remove trip with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Error' });
  }
});

module.exports = router;



