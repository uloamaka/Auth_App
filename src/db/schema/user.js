const { pgTable, serial, varchar, timestamp } = require('drizzle-orm/pg-core');
const { relations } = require('drizzle-orm');

// {
// 	"userId": "string" // must be unique
// 	"firstName": "string", // must not be null
// 	"lastName": "string" // must not be null
// 	"email": "string" // must be unique and must not be null
// 	"password": "string" // must not be null
// 	"phone": "string"
// }

const users = pgTable('users', {
    userId: serial('userId').primaryKey(),
    firstName: varchar('firstName', { length: 255 }).notNull(),
    lastName: varchar('lastName', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 255 }),
    password: varchar('password', { length: 255 }),

    refreshToken: varchar('refresh_token', { length: 255 }),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at', { precision: 6, withTimezone: true }),
});


module.exports = {
    users,
};