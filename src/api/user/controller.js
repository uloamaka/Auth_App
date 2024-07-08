const { StatusCodes } = require('http-status-codes');
const Service = require('./service');
const BaseController = require('../../utils/base-controller');

class Controller extends BaseController {
    constructor() {
        super();
        this.service = new Service();
    }

    async getUser(req, res, next) {
        try {
            let userId = req.params.id;
            const { status, message, data } = await this.service.getUser(
                userId
            );

            this.responseHandler(res, status, StatusCodes.OK, message, data);
        } catch (error) {
            console.log(error)
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
