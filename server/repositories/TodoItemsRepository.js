const PgClient = require('./PgClient')

class TodoItemsRepository {

    async getAll() {
        const client = await PgClient.getConnection()
        return client.select().from('todo_item')
    }

    async create(todoItem) {
        const client = await PgClient.getConnection()
        return client('todo_item').insert(todoItem).returning('*')
    }

    async delete(todoItemId) {
        const client = await PgClient.getConnection()
        return client('todo_item').where('id', todoItemId).del()
    }
}

module.exports = new TodoItemsRepository()