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
            this.validateRequest(req);

            const { status, message, data } = await this.service.register(req.body);

            this.responseHandler(res, status, message, data);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = Controller;
