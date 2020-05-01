const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('trips');
}

function findById(id) {
  return db('trips').where({ id }).first();
}

function add(trips) {
  return db('trips')
    .insert(trips)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db('trips')
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id);
    });
}

async function remove(id) {
  const trip = await findById(id);
  const count = await db('trips').where({ id }).del();
  return count ? trip : null
}
