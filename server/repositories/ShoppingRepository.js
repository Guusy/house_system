const PgClient = require('./PgClient')

class ShoppingRepository {

    constructor() {
        this.tableName = 'shopping_item'
    }

    async getAll() {
        const client = await PgClient.getConnection()
        return client.select().from(this.tableName)
    }

    async create(product) {
        const client = await PgClient.getConnection()
        return client(this.tableName).insert(product).returning('*')
    }

    async update(product) {
        const client = await PgClient.getConnection()
        return client(this.tableName)
            .where({ id: product.id })
            .update(product)
            .returning('*')
    }

}

module.exports = new ShoppingRepository()