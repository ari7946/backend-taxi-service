//******** Client react app state ************
//******************************************** 
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
    tbl.real('distance').notNullable();;
    tbl.string('startAddress', 500).notNullable();
    tbl.string('endAddress', 500).notNullable();
    tbl.real('price', 500);
    tbl.string('name', 500).notNullable();
    tbl.string('comments', 500);
    tbl.string('phone', 500).notNullable();
    tbl.integer('passengers');
    tbl.string('email', 500).notNullable();
    tbl.string('direction', 500);
    tbl.date('date', 500).notNullable();
    tbl.time('time', 500).notNullable();
    tbl.string('vehicle', 500).notNullable();
    tbl.string('status', 20);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  // undoing that change
  return knex.schema.dropTableIfExists('trips');
}