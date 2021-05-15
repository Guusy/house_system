
exports.up = function (knex) {
    return knex.schema.createTable('todo_item', (table) => {
        table.increments('id');
        table.string('title', 50).notNullable();
        table.string('description').notNullable();
        table.string('category', 50).notNullable();
        table.date('estimated_date_to_do').notNullable()
        table.date('finished')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};
