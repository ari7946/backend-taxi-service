exports.up = function (knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('username');
    tbl.string('password');
  })
};

exports.down = function (knex) {
  // undoing that change
  return knex.schema.dropTableIfExists('users');
}