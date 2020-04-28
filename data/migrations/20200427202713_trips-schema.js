
//******** Client react app state
// distance: "",
// points: [null, null],
// startAddress: '',
// endAddress: '',
//******** form fields **********
// price: null,
// name: null,
// comments: null,
// phone: null,
// passengers: 1,
// email: null,
// direction: 'oneWay',
// date: null,
// time: null,
// dropFee: 10,
// vehicle: 'sedan',
//********* other ***********
// loading: false,
// error: false,
// errorMessage: '',
// invalidFields: [],
exports.up = function (knex) {
  return knex.schema.createTable('trips', tbl => {
    tbl.increments();
    tbl.real('distance');
    tbl.string('startAddress', 500);
    tbl.string('endAddress', 500);
    tbl.real('price', 500);
    tbl.string('name', 500);
    tbl.string('comments', 500);
    tbl.string('phone', 500);
    tbl.integer('passengers');
    tbl.string('email', 500);
    tbl.string('direction', 500);
    tbl.string('date', 500);
    tbl.string('time', 500);
    tbl.string('vehicle', 500);
    tbl.timestamp('created_at').defaultTo(knex.fn.now()); 
  })
};

exports.down = function (knex) {
  // undoing that change
  return knex.schema.dropTableIfExists('trips');
};