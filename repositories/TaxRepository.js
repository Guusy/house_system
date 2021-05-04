const PgClient = require('./PgClient')

class TaxRepository {

    async getAll() {
        const client = await PgClient.getPool()
        const result = await client.query('SELECT * FROM tax');
        client.release();
        return (result) ? result.rows : []
    }

    async create(tax){
        const client = await PgClient.getPool()
        const query = "insert into tax values (DEFAULT, $1, $2, $3, $4, $5,$6);"
        const values = this._getTaxValues(tax)
        const result = await client.query(query, values);
        client.release();
        return (result) ? result.rows : []
    }

    _getTaxValues(tax){
        return [ tax.title, tax.description, tax.category, tax.amount, tax.payment_method, tax.estimated_date_pay ]
    }
}

module.exports = new TaxRepository()