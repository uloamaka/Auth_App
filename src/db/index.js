const { drizzle } = require('drizzle-orm/postgres-js');
const schema = require('./schema/index');
const postgres = require('postgres');
const { dbURL } = require('../utils/config');

const client = postgres(dbURL);
const migrationClient = postgres(dbURL, { max: 1 });
const db = drizzle(client, { schema });

module.exports = {
    db,
    dbURL,
    migrationClient,
};
