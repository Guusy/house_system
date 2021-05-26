
exports.up = function(knex) {
    return knex.schema.createTable('shopping_item', (table) => {
        table.increments('id');
        table.string('name', 50).notNullable();
        table.string('quantity').notNullable();
        table.string('category').notNullable();
        table.boolean('measurable').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('shopping_item')
};