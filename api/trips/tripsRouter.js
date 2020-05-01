const Trips = require('./tripsModel');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const trips = await Trips.find();
    res.json(trips)
  } catch (error) {
    res.status(500).json({error, message: "Internal error"})
  }
});

router.get('/:id', async (req, res) => {
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
  console.log(tripData);
  try {
    const trip = await Trips.add(tripData);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Internal error' })
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const trip = await Trips.findById(id);
    if (trip) {
      const updatedTrip = await Trips.update(changes, id);
      res.json(updatedTrip)
    } else {
      res.status(404).json({ message: 'Unable to find trip with given id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Error' });
  }

});

router.delete('/:id', async (req, res) => {
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



