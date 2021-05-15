const knex = require('knex')
const knexFile = require('../knexfile')
class PgClient {

    getConnection(){
        const env = (process.env.NODE_ENV === "production") ? "production" : "development"
        return knex(knexFile[env])
    }
}
module.exports = new PgClient()