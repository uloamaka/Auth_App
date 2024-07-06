const bcrypt = require('bcrypt');
const jwt = require('../../services/jwt');

class Service {
    async getUser(payload) {
        try {
            //const {id} = payload;
            //check DB for user
            //If user details not found throw error "Registration unsuccessful"
            //If found return
            //          {
            // 		"status": "success",
            //     "message": "<message>",
            //     "data": {
            //       "userId": "string",
            //       "firstName": "string",
            // 			"lastName": "string",
            // 			"email": "string",
            // 			"phone": "string"
            //     }
            // }

            return {
                status: 'success',
                message: '<message>',
                data,
            };
            //             {
            //     "status": "Bad request",
            //     "message": "User not found!",
            //     "statusCode": 400
            // }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Service;
