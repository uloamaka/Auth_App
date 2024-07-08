const { StatusCodes } = require('http-status-codes');
const Service = require('./Service.js');
const BaseController = require('../../utils/base-controller');
const { z, ZodError } = require('zod');

const userSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z
        .string()
        .optional()
        .refine((val) => val === undefined || typeof val === 'string', {
            message: 'Must be a string',
        }),
});

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
class Controller extends BaseController {
    constructor() {
        super();
        this.service = new Service();
    }

    async register(req, res, next) {
        try {
            this.validateRequest(req);
            BaseController.validateRequest(req, userSchema);
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
    async login(req, res, next) {
        try {
            // this.validateRequest(req);
            BaseController.validateRequest(req, loginSchema);

            const { status, message, data } = await this.service.login(
                req.body
            );

            this.responseHandler(res, status, StatusCodes.OK, message, data);
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
                            error.statusCode ||
                            StatusCodes.INTERNAL_SERVER_ERROR,
                    });
        }
    }
}

module.exports = Controller;
