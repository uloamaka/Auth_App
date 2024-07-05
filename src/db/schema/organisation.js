const {
    pgTable,
    serial,
    varchar,
} = require('drizzle-orm/pg-core');
const { relations } = require('drizzle-orm');

const organisations = pgTable('organisations', {
    // {
    // 	"orgId": "string", // Unique
    // 	"name": "string", // Required and cannot be null
    // 	"description": "string",
    // }

    orgId: serial('orgId').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
});

module.exports = {
    organisations,
};