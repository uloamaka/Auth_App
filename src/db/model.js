const {
    users,
    organisations,
    usersToOrgs,
} = require('../db/schema/userOrganisation');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../db');
const { eq } = require('drizzle-orm');

async function getUserByEmail(email) {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .execute();

        if (user.length > 0) {
            return user[0];
        } else {
            throw new Error('No user found for the given email');
        }
    } catch (error) {
        console.error('Error fetching User:', error);
        throw error;
    }
}
async function getUserById(userId) {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.userId, userId))
            .execute();

        if (user.length > 0) {
            return user[0];
        } else {
            throw new Error('No user found for the given Id');
        }
    } catch (error) {
        console.error('Error fetching User:', error);
        throw error;
    }
}

async function addUserToOrg(userId, orgId) {
    try {
        await db
            .insert(usersToOrgs)
            .values({
                userId,
                orgId,
            })
            .returning()
            .execute();

        return null;
    } catch (error) {
        console.error('Error adding user to organisation:', error);
        throw error;
    }
}

async function createOrg(userId, name, description) {
    try {
        const orgId = uuidv4();
       const newOrg = await db.transaction(async (tx) => {
           const org = await tx
               .insert(organisations)
               .values({
                   orgId,
                   name,
                   description,
               })
               .returning()
               .execute()
               .then((result) => result[0]);

           await tx
               .insert(usersToOrgs)
               .values({ userId: userId, orgId: orgId });

           return org;
       });
        return newOrg;
    } catch (error) {
        console.error('Error creating organisation:', error);
        throw error;
    }
}

async function getOrgIdByUserId(userId) {
    try {
        const result = await db
            .select()
            .from(usersToOrgs)
            .where(eq(usersToOrgs.userId, userId))
            .execute();

        if (result.length > 0) {
            const orgIds = result.map((item) => {
                return { orgId: item.orgId };
            });
            return orgIds;
        } else {
            throw new Error('No organization found for the given user ID');
        }
    } catch (error) {
        console.error('Error fetching organisation ID:', error);
        throw error;
    }
}

async function getOrganisationById(orgId) {
    try {
        const org = await db
            .select()
            .from(organisations)
            .where(eq(organisations.orgId, orgId))
            .execute();

        if (org.length > 0) {
            return org[0];
        } else {
            throw new Error('No organisation found for the given org ID');
        }
    } catch (error) {
        console.error('Error fetching organisation:', error);
        throw error;
    }
}

async function getAllUserOrganizations(userId) {
    try {
        const result = await db
            .select()
            .from(usersToOrgs)
            .where(eq(usersToOrgs.userId, userId))
            .execute();

        if (result.length > 0) {
            // Fetch all organizations in parallel
            const orgs = await Promise.all(
                result.map(async (userOrg) => {
                    const org = await getOrganisationById(userOrg.orgId);
                    return {
                        orgId: org.orgId,
                        name: org.name,
                        description: org.description,
                    };
                })
            );
            return orgs;
        } else {
            throw new Error('No organization found for the given user ID');
        }
    } catch (error) {
        console.error('Error fetching organisations:', error);
        throw error;
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    addUserToOrg,
    createOrg,
    getOrgIdByUserId,
    getOrganisationById,
    getAllUserOrganizations,
};
