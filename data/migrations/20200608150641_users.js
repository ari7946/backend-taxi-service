exports.up = function (knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users
      .string('username', 255)
      .notNullable()
      .unique();
    users.string('password', 255).notNullable();
    users.string('name', 255);
    users.string('phone', 225);
    users.string('email', 225);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};