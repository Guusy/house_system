const PgClient = require('./PgClient')

class TaxRepository {

    constructor() {
        this.tableName = 'tax'
    }

    async getAll() {
        const client = await PgClient.getConnection()
        return client.select().from(this.tableName)
    }

    async create(tax) {
        const client = await PgClient.getConnection()
        return client('tax').insert(tax).returning('*')
    }

}

module.exports = new TaxRepository()