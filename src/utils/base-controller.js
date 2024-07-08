const { validationResult } = require('express-validator');
const { CustomError } = require('./service-error.js');
const { StatusCodes } = require('http-status-codes');

class BaseController {
    validateRequest(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let message = errors.array()[0].msg;
            throw new CustomError(
                message,
                errors.array(),
                StatusCodes.UNPROCESSABLE_ENTITY
            );
        }
    }

    static validateRequest(req, schema) {
        const validationResult = schema.safeParse(req.body);
        if (!validationResult.success) {
            throw new CustomError(
                'Validation error',
                validationResult.error,
                StatusCodes.UNPROCESSABLE_ENTITY
            );
        }
    }

    responseHandler(res, status, statusCode, message, data = null) {
        res.status(statusCode).json({
            status: status,
            message: message,
            data,
        });
    }

    static responseHandler(res, status, message, data = null) {
        res.status(status).json({
            status: status,
            message: message,
            data,
        });
    }

    extractPagingParams(req) {
        let { limit, page, paginate } = req.query;
        limit = limit ? parseInt(`${limit}`) : 25;
        page = page ? (parseInt(`${page}`) < 1 ? 1 : parseInt(`${page}`)) : 1;

        return { limit, page, pagination: paginate };
    }
}

module.exports = BaseController;
