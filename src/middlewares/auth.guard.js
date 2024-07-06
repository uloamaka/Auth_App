const jwt = require('../services/jwt');
const { isEmpty } = require('../utils/helpers');
const BaseController = require('../utils/base-controller');

async function auth(req, res, next) {
    try {
        BaseController.validateRequest(req);

        const auth_header = req.headers.authorization;
        if (!auth_header || !auth_header.startsWith('Bearer')) {
            throw new Error('Authentication invalid');
        }

        const token = auth_header.split(' ')[1];
        if (isEmpty(token))
            throw new Error('Authentication invalid');

        const payload = await jwt.verifyAccessToken(token);

        req.user = payload.email;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = auth;
