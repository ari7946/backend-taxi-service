
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trips').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('trips').insert([
        { 
          distance: 4234234.234,
          startAddress: 'afasdfasf',
          endAddress: 'adfasdfasdfasdfasdfasdfasdfasdf'
        },
        {
          distance: 423,
          startAddress: 'afasdfasf',
          endAddress: 'adf'
        },
        {
          distance: 276,
          startAddress: 'afasdfasf',
          endAddress: 'afasdfkjh'
        },
        {
          distance: 5,
          startAddress: 'afasdfasf',
          endAddress: 'hello'
        },
      ]);
    });
};

