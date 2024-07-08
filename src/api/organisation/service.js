const bcrypt = require('bcrypt');
const jwt = require('../../services/jwt');
const {
    addUserToOrg,
    createOrg,
    getAllUserOrganizations,
    getOrganisationById,
    getUserByEmail,
    getOrgIdByUserId,
} = require('../../db/model');
const { organisations } = require('../../db/schema/userOrganisation');
const { StatusCodes } = require('http-status-codes');

class Service {
    async getOrg(email) {
        try {
            const user = await getUserByEmail(email);
            const userOrgs = await getAllUserOrganizations(user.userId);
            const data = {
                organisations: userOrgs.map((org) => ({
                    orgId: org.orgId,
                    name: org.name,
                    description: org.description,
                })),
            };
            return {
                status: 'success',
                message: 'User organisations details fechted successfully',
                data,
            };
        } catch (error) {
            if (!error.statusCode) {
                const serverError = new Error(
                    `Opps! error loading User's Orgs`
                );
                serverError.status = 'Bad request';
                serverError.statusCode = StatusCodes.BAD_REQUEST;
                throw serverError;
            }
            throw error;
        }
    }
    async getOrgById(orgId, email) {
        try {
            const user = await getUserByEmail(email);

            const userOrgs = await getOrgIdByUserId(user.userId);

            const isUserInOrg = userOrgs.some((org) => org.orgId === orgId);

            if (!isUserInOrg) {
                throw new Error('Organization does not exist');
            }
            const org = await getOrganisationById(orgId);

            const data = {
                orgId: org.orgId,
                name: org.name,
                description: org.description,
            };

            return {
                status: 'success',
                message: 'organisation details fechted successfully',
                data,
            };
        } catch (error) {
            if (!error.statusCode) {
                const serverError = error;
                serverError.status = 'Bad request';
                serverError.statusCode = StatusCodes.BAD_REQUEST;
                throw serverError;
            }
            throw error;
        }
    }
    async createOrg(email, name, description) {
        try {
            const { userId } = await getUserByEmail(email);
            const newOrg = await createOrg(userId, name, description);
            const data = {
                orgId: newOrg.orgId,
                name: newOrg.name,
                description: newOrg.description,
            };
            return {
                status: 'success',
                message: 'Organisation created successfully',
                data,
            };
        } catch (error) {
            if (!error.statusCode) {
                const serverError = new Error('Client error');
                serverError.status = 'Bad Request';
                serverError.statusCode = StatusCodes.BAD_REQUEST;
                throw serverError;
            }
            throw error;
        }
    }
    async addOrgUserById(email, orgId, userId) {
        try {
            const orgExists = await getOrganisationById(orgId);
            if (!orgExists) {
                throw new Error('Organization does not exist');
            }
            const user = await getUserByEmail(email);

            const userOrgs = await getOrgIdByUserId(user.userId);
            const isUserInOrg = userOrgs.some((org) => org.orgId === orgId);

            if (!isUserInOrg) {
                throw new Error('User does not belong to this organization');
            }
            await addUserToOrg(userId, orgId);

            return {
                status: 'success',
                message: 'User added to organisation successfully',
            };
        } catch (error) {
            if (!error.statusCode) {
                const serverError = new Error('');
                serverError.status = 'Bad request';
                serverError.statusCode = StatusCodes.UNAUTHORIZED;
                throw serverError;
            }
            throw error;
        }
    }
}

module.exports = Service;
