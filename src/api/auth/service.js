const bcrypt = require('bcrypt');
const jwt = require('../../services/jwt');
const User = require('./path/to/user/model');

class Service {
    async register(payload) {
        try {
            const { firstName, lastName, email, passord, phone } = payload;
            //check DB for user
            //If user details found throw error "Registration unsuccessful"
            //If not found start process to register as new user
            //Hash password
            //asign jwt
            //set the data payload
            // res.status === 201 "created"

            // "data": {
            //    "accessToken": "eyJh...",
            //    "user": {
            //           "userId": "string",
            //           "firstName": "string",
            //     			"lastName": "string",
            //     			"email": "string",
            //     			"phone": "string",
            //       }
            // }
            return {
                status: 'success',
                message: 'Registration successful',
                data,
            };
            //             {
            //     "status": "Bad request",
            //     "message": "Registration unsuccessful",
            //     "statusCode": 400
            // }
        } catch (error) {
            throw error;
        }
    }
    async login(payload) {
        try {
            const { email, password } = payload;
            //Check DB if user exists
            //If no user detail found throw an error "Authentication failed"
            //If found compare provided password with user actual password
            //If password is wrong Throw an error "Authentication failed"
            //If password is valid
            //Assign token
            //set the data payload

            //     "data": {
            //       "accessToken": "eyJh...",
            //       "user": {
            // 	      "userId": "string",
            // 	      "firstName": "string",
            // 				"lastName": "string",
            // 				"email": "string",
            // 				"phone": "string",
            //       }
            //     }
            // }

            return {
                status: 'success',
                message: 'Login successful',
                data,
            };
            //             {
            //     "status": "Bad request",
            //     "message": "Authentication failed",
            //     "statusCode": 401
            // }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Service;
