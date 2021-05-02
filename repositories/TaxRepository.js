const PgClient = require('./PgClient')

class TaxRepository {

    async getAll() {
        const client = await PgClient.getPool()
        const result = await client.query('SELECT * FROM tax');
        client.release();
        return (result) ? result.rows : []
    }
}

module.exports = new TaxRepository()