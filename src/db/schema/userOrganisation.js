const {
    integer,
    pgTable,
    primaryKey,
    serial,
    varchar,
    timestamp,
} = require('drizzle-orm/pg-core');
const { relations } = require('drizzle-orm');

const users = pgTable('users', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id').notNull().unique(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phone: varchar('phone', { length: 255 }),
    password: varchar('password', { length: 255 }).notNull(),

    accessToken: varchar('access_token', { length: 255 }),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    deletedAt: timestamp('deleted_at', { precision: 6, withTimezone: true }),
});

const usersRelations = relations(users, ({ many }) => ({
    usersToOrgs: many(usersToOrgs),
}));

const organisations = pgTable('organisations', {
    id: serial('id').primaryKey(),
    orgId: varchar('org_id').notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
});

const orgRelations = relations(organisations, ({ many }) => ({
    usersToOrgs: many(usersToOrgs),
}));

const usersToOrgs = pgTable(
    'users_to_orgs',
    {
        userId: varchar('user_id')
            .notNull()
            .references(() => users.userId),
        orgId: varchar('org_id')
            .notNull()
            .references(() => organisations.orgId),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.orgId] }),
    })
);

const usersToOrgsRelations = relations(usersToOrgs, ({ one }) => ({
    organisation: one(organisations, {
        fields: [usersToOrgs.orgId],
        references: [organisations.id],
    }),
    user: one(users, {
        fields: [usersToOrgs.userId],
        references: [users.id],
    }),
}));

module.exports = {
    users,
    organisations,
    usersToOrgs,
    usersToOrgsRelations,
    usersRelations,
    orgRelations,
};
