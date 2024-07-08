const { StatusCodes } = require('http-status-codes');
const {getUserByEmail, getUserById} = require('../../db/model')
class Service {
    async getUser(  userId ) {
        try {

            const userDetails = await getUserById(userId);

            if (!userDetails) {
                throw new Error('User not found!');
            }
            let data = {
                userId: userDetails.userId,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
                phone: userDetails.phone,
            };

            return {
                status: 'success',
                message: 'User details fechted successfully',
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
}

module.exports = Service;
