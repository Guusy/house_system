
exports.up = function(knex) {
    return knex.schema.createTable('tax', (table) => {
        table.increments('id');
        table.string('title', 50).notNullable();
        table.string('description').notNullable();
        table.string('category', 50).notNullable();
        table.integer('amount').notNullable();
        table.string('payment_method').notNullable();
        table.date('estimated_date_pay').notNullable()
        table.date('paid')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tax')
};