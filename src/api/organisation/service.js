const bcrypt = require('bcrypt');
const jwt = require('../../services/jwt');

class Service {
    async getOrg() {
        try {
            //check DB for authenticated user organisation
            //If user organisation details not found throw error "No organisation found!"
            //If found return

            //            {
            //     "status": "success",
            // 		"message": "<message>",
            //     "data": {
            //       "organisations": [
            // 	      {
            // 		      "orgId": "string",
            // 					"name": "string",
            // 					"description": "string",
            // 	      }
            //       ]
            //     }
            // }

            return {
                status: 'success',
                message: '<message>',
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
    async getOrgById(payload) {
        try {
            const { id } = payload;
            //check DB for authenticated user organisation by id
            //If user organisation details not found throw error "No organisation found!"
            //If found return

            //            {
            //     "status": "success",
            // 		"message": "<message>",
            //     "data": {
            // 			"orgId": "string", // Unique
            // 			"name": "string", // Required and cannot be null
            // 			"description": "string",
            // 	}
            // }
            return {
                status: 'success',
                message: '<message>',
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
    async createOrg(payload) {
        try {
            const { name, description } = payload;
            //create new user organisation
            //set the data payload
            // res.status === 201 "created"

            //     "status": "success",
            //     "message": "Organisation created successfully",
            //     "data": {
            // 	      "orgId": "string",
            // 				"name": "string",
            // 				"description": "string"
            //     }
            return {
                status: 'success',
                message: 'Organisation created successfully',
                data,
            };
            // {
            //     "status": "Bad Request",
            //     "message": "Client error",
            //     "statusCode": 400
            // }
        } catch (error) {
            throw error;
        }
    }
    async addOrgUserById(payload) {
        try {
            const { userId, orgId } = payload;
            //Check DB if organisation id exists?
            //If not, throw an error "Organisation does not exists"
            //If yes add userId to organisation

            //         {
            //     "status": "success",
            //     "message": "User added to organisation successfully",
            // }

            return {
                status: 'success',
                message: 'User added to organisation successfully',
                data,
            };
            //             {
            //     "status": "Bad request",
            //     "message": "",
            //     "statusCode": 401
            // }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Service;
