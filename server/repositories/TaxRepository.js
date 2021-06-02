const PgClient = require('./PgClient')

class TaxRepository {

    constructor() {
        this.tableName = 'tax'
    }

    async getAll() {
        const client = await PgClient.getConnection()
        return client.select().from(this.tableName)
    }

    async getById(id) {
        const client = await PgClient.getConnection()
        const [result] = await client.select().from(this.tableName).where('id', id)
        return result
    }

    async create(tax) {
        const client = await PgClient.getConnection()
        return client('tax').insert(tax).returning('*')
    }

    async delete(taxId) {
        const client = await PgClient.getConnection()
        return client('tax').where('id', taxId).del()
    }

    async pay(taxId) {
        const client = await PgClient.getConnection()
        return client('tax').update({ paid: new Date() }).where('id', taxId).returning('*')
    }

}

module.exports = new TaxRepository()