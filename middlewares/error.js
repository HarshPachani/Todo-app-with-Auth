class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

//This is the middleware of an error handling for next() functions.
export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error!";
    err.statusCode =  err.statusCode || 500;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;