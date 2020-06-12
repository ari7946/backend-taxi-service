exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          password: 'pass123',
          name: '',
          phone: '',
          email: '',
        },
        {
          username: 'rayallen',
          password: 'password',
          name: 'Ray Allen',
          phone: '914-323-2432',
          email: 'jamesdoe@gmail.com',
        },
        {
          username: 'antonwilson',
          password: 'password',
          name: 'Anton Wilson',
          phone: '714-233-1973',
          email: 'awilson@gmail.com',
        },
        {
          username: 'ahmadrashad',
          password: 'password',
          name: 'Ahmad Rashad',
          phone: '355-343-2261',
          email: "ahmadrashad@gmail.com",
        },
        {
          username: 'elimeed',
          password: 'password',
          name: 'Eli Meed',
          phone: '914-323-2432',
          email: 'jamesdoe@gmail.com',
        },
        {
          username: 'anna',
          password: 'password',
          name: 'Anna',
          phone: '714-234-2342',
          email: 'Anna123123@gmail.com',
        }
      ]);
    });
};