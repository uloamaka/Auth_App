const { StatusCodes } = require('http-status-codes');
const Service = require('./service');
const BaseController = require('../../utils/base-controller');
const { z, ZodError } = require('zod');

const createOrgSchema = z.object({
    name: z.string().min(1, 'Org`s name is required'),
    description: z.string().optional(),
});
const genericSchema = z.object({
    req: z.any(),
});
class Controller extends BaseController {
    constructor() {
        super();
        this.service = new Service();
    }

    async getOrg(req, res, next) {
        try {
            this.validateRequest(req);
            BaseController.validateRequest(req, genericSchema);
            const userEmail = req.user;
            const { status, message, data } = await this.service.getOrg(
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

    async getOrgById(req, res, next) {
        try {
            this.validateRequest(req);
            BaseController.validateRequest(req, genericSchema);
            const { orgId } = req.params;
            const userEmail = req.user;
            const { status, message, data } = await this.service.getOrgById(
                orgId,
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

    async createOrg(req, res, next) {
        try {
            this.validateRequest(req);
            BaseController.validateRequest(req, createOrgSchema);
            const userEmail = req.user;
            const { name, description } = req.body;

            const { status, message, data } = await this.service.createOrg(
                userEmail,
                name,
                description
            );

            this.responseHandler(
                res,
                status,
                StatusCodes.CREATED,
                message,
                data
            );
        } catch (error) {
             if (error.details instanceof ZodError) {
                 const errors = error.details.errors.map((err) => ({
                     field: err.path.join('.'),
                     message: err.message,
                 }));
                 return res
                     .status(StatusCodes.UNPROCESSABLE_ENTITY)
                     .json({ errors });
             }
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
            BaseController.validateRequest(req, genericSchema);
            const userEmail = req.user;
            const { orgId } = req.params;
            const { userId } = req.body;

            const { status, message } = await this.service.addOrgUserById(
                userEmail,
                orgId,
                userId
            );

            res.status(StatusCodes.OK).json({
                status: status,
                message: message,
            });
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
