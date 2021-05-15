// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      user: 'guusy',
      database: 'guusy'
    },
    migrations: {
      directory: './migrations'
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations'
    },
  }
};
