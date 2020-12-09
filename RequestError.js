export default class extends Error {
    constructor(statusCode, message, originalError) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.originalError = originalError;

        Error.captureStackTrace(this, this.constructor);
    }
};