class CustomError extends Error {
    constructor(message, details, statusCode) {
        super(message);
        this.details = details;
        this.statusCode = statusCode;
        this.status = 'Bad request';
    }
}

module.exports = { CustomError };

