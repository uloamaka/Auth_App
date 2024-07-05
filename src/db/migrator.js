require('dotenv').config();
const { drizzle } = require('drizzle-orm/postgres-js');
const { migrationClient } = require('.');
const { migrate } = require('drizzle-orm/postgres-js/migrator');

const db = drizzle(migrationClient);

// IIFE to run migrations
(async () => {
    try {
        await migrate(db, { migrationsFolder: './migrations' });
    } catch (error) {
        console.log(error);
    }
    process.exit(0);
})();
