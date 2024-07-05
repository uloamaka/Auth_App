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

            const { message, data } = await this.service.register(req.body);

            this.responseHandler(res, StatusCodes.CREATED, message, data);
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            this.validateRequest(req);

            const { message, data } = await this.service.login(req.body);

            this.responseHandler(res, StatusCodes.OK, message, data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
