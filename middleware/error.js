const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // Wrong mongoDb Error lage size of ID
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid : ${err.path}`;
        err = new ErrorHandler(message, 404);
    }
    // JWT WEbToken Error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 404);
    }
    if (err.name === "TokenExpireError") {
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message, 404);
    }

    // Moogoose duplication key error

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 404);
    }

    res.status(err.statusCode).json(
        {
            status: false,
            errors: [
                {
                    param: err.param,
                    message: err.message,
                    code: err.code
                }
            ]
        }
    )

}
