const bcrypt = require('bcrypt');
const {
    users,
    organisations,
    usersToOrgs,
} = require('../../db/schema/userOrganisation');
const jwt = require('../../services/jwt');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../../db');
const { StatusCodes } = require('http-status-codes');
const { eq } = require('drizzle-orm');

class Service {
    async register(payload) {
        try {
            const { firstName, lastName, email, password, phone } = payload;
            const userExists = await db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .execute()
                .then((result) => result[0]);
            if (userExists) {
                const error = new Error('Registration unsuccessful');
                error.status = 'Bad request';
                error.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
                throw error;
            }
            let data;
            const hashedPassword = await bcrypt.hash(password, 10);
            const { access_token } = await jwt.generateToken(email);
            await db.transaction(async (tx) => {
                const userId = uuidv4();
                const user = await tx
                    .insert(users)
                    .values({
                        userId,
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword,
                        phone,
                        accessToken: access_token,
                    })
                    .returning()
                    .execute()
                    .then((result) => result[0]);
                const orgId = uuidv4();
                await tx.insert(organisations).values({
                    orgId,
                    name: `${firstName}'s Organisation`,
                    description: '',
                });
                await tx
                    .insert(usersToOrgs)
                    .values({ userId: userId, orgId: orgId });

                data = {
                    accessToken: access_token,
                    user: {
                        userId: user.userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                    },
                };
            });
            return {
                status: 'success',
                message: 'Registration successful',
                data,
            };
        } catch (error) {
            if (!error.statusCode) {
                const serverError = new Error('Registration unsuccessful');
                serverError.status = 'Bad request';
                serverError.statusCode = StatusCodes.BAD_REQUEST;
                throw serverError;
            }
            throw error;
        }
    }
    async login(payload) {
        try {
            const { email, password } = payload;
            const user = await db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .execute()
                .then((result) => result[0]);

            if (!user) {
                const error = new Error('Authentication failed');
                error.status = 'Bad request';
                error.statusCode = StatusCodes.UNAUTHORIZED;
                throw error;
            }
            const is_valid = await bcrypt.compare(password, user.password);
            if (!is_valid) {
                const error = new Error('Authentication failed');
                error.status = 'Bad request';
                error.statusCode = StatusCodes.UNAUTHORIZED;
                throw error;
            }

            const { access_token } = await jwt.generateToken(email);

            const data = {
                accessToken: access_token,
                user: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            };

            return {
                status: 'success',
                message: 'Login successful',
                data,
            };
        } catch (error) {
            if (!error.statusCode) {
                const serverError = new Error('Authentication failed');
                serverError.status = 'Bad request';
                serverError.statusCode = StatusCodes.UNAUTHORIZED;
                throw serverError;
            }
            throw error;
        }
    }
}

module.exports = Service;
