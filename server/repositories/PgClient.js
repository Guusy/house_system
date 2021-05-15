
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


class PgClient {

    getPool() {
        return pool.connect();

    }
}
module.exports = new PgClient()