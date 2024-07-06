const { StatusCodes } = require('http-status-codes');
const Service = require('./service');
const BaseController = require('../../utils/base-controller');

class Controller extends BaseController {
    constructor() {
        super();
        this.service = new Service();
    }

    async register(req, res, next) {
        try {
            this.validateRequest(req);
            const { status, message, data } = await this.service.register(
                req.body
            );

            this.responseHandler(
                res,
                status,
                StatusCodes.CREATED,
                message,
                data
            );
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
    async login(req, res, next) {
        try {
            this.validateRequest(req);

            const {status, message, data } = await this.service.login(req.body);

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
