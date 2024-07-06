const { StatusCodes } = require('http-status-codes');
const Service = require('./service');
const BaseController = require('../../utils/base-controller');

class Controller extends BaseController {
    constructor() {
        super();
        this.service = new Service();
    }

    async getOrg(req, res, next) {
        try {
            this.validateRequest(req);
            let userEmail = req.user
            const { status, message, data } = await this.service.getOrg(
                userEmail
            );

            this.responseHandler(res, status, StatusCodes.CREATED, message, data);
        } catch (error) {
               res.status(
                   error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
               ).json({
                   status: error.status || 'Internal Server Error',
                   message: error.message || 'Something went wrong',
                   statusCode:
                       error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
               });
        }
    }
    async getOrgById(req, res, next) {
        try {
            this.validateRequest(req);
            let userEmail = req.user;
            const {status, message, data } = await this.service.getOrgById(userEmail);

            this.responseHandler(res,status, StatusCodes.OK, message, data);
        } catch (error) {
               res.status(
                   error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
               ).json({
                   status: error.status || 'Internal Server Error',
                   message: error.message || 'Something went wrong',
                   statusCode:
                       error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
               });
        }
    }
    async createOrg(req, res, next) {
        try {
            this.validateRequest(req);
            let userEmail = req.user;
            const {status, message, data } = await this.service.createOrg(userEmail);

            this.responseHandler(res,status, StatusCodes.OK, message, data);
        } catch (error) {
               res.status(
                   error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
               ).json({
                   status: error.status || 'Internal Server Error',
                   message: error.message || 'Something went wrong',
                   statusCode:
                       error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
               });
        }
    }
    async addOrgUserById(req, res, next) {
        try {
            this.validateRequest(req);
            let userEmail = req.user;
            const {status, message, data } = await this.service.addOrgUserById(
                userEmail
            );

            this.responseHandler(res, status, StatusCodes.OK, message, data);
        } catch (error) {
               res.status(
                   error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
               ).json({
                   status: error.status || 'Internal Server Error',
                   message: error.message || 'Something went wrong',
                   statusCode:
                       error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
               });
        }
    }
}

module.exports = Controller;
