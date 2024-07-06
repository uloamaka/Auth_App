const { validationResult } = require('express-validator');
const { CustomError } = require('./service-error.js');

class BaseController {
    validateRequest(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let message = errors.array()[0].msg;
            throw new CustomError(message, errors.array(), 422);
        }
    }

    static validateRequest(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let message = errors.array()[0].msg;
            throw new CustomError(message, errors.array(), 422);
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
            error: /^4/.test(status.toString()) ? true : false,
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
