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

            const { message, data } = await this.service.getOrg(req.body);

            this.responseHandler(res, StatusCodes.CREATED, message, data);
        } catch (error) {
            next(error);
        }
    }
    async getOrgById(req, res, next) {
        try {
            this.validateRequest(req);

            const { message, data } = await this.service.getOrgById(req.body);

            this.responseHandler(res, StatusCodes.OK, message, data);
        } catch (error) {
            next(error);
        }
    }
    async createOrg(req, res, next) {
        try {
            this.validateRequest(req);

            const { message, data } = await this.service.createOrg(req.body);

            this.responseHandler(res, StatusCodes.OK, message, data);
        } catch (error) {
            next(error);
        }
    }
    async addOrgUserById(req, res, next) {
        try {
            this.validateRequest(req);

            const { message, data } = await this.service.addOrgUserById(
                req.body
            );

            this.responseHandler(res, StatusCodes.OK, message, data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
