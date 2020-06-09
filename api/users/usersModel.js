const db = require('../../data/db-config');

module.exports = {
  add,
  find,
  remove,
  update,
  findBy,
  findById,
};

function find() {
  return db('users')
    .select('id', 'username');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findBy({ id });
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first()
}

function update(changes, id) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id);
    });
}

async function remove(id) {
  const user = await findById(id);
  const count = await db('users').where({ id }).del();
  return count ? user : null;
}
