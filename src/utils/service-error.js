class CustomError extends Error {
  constructor(message, errors, status) {
    super(message);
    this.name = 'CustomError';
    this.errors = errors;
    this.status = status;
  }
}

module.exports = CustomError;