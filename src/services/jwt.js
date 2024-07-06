const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

class JWTService {
    async generateToken(email) {
        const access_token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '10m',
            audience: 'API',
            issuer: 'SMS',
        });

        return {
            access_token,
            expires_at: dayjs().add(10, 'minutes').unix(),
        };
    }

    async verifyAccessToken(token) {
        try {
            const decodedToken = await jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET
            );
            if (!decodedToken) throw new Error('Token is invalid or expired');
            return decodedToken;
        } catch (error) {
            throw new Error('Token is invalid or expired');
        }
    }
}

module.exports = new JWTService();
