require('dotenv').config()


const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || "An internal server error occurred!"

    res.status(statusCode).json({
        status: "failed",
        error: null,
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })

    next()
}


const joiErrors = (error, req, res, next) => {
    // next error if not JOI errors
    if (error._original === undefined) {
        return next(error)
    }
    const errorObj = {};

    error.details.forEach((errorDetail) => {
        errorObj[errorDetail.context.key] = errorDetail.message;
    })

    res.status(400).json({
        success: "failed",
        error: errorObj,
        message: error.message
    })
    next()

};

module.exports = { errorHandlerMiddleware, joiErrors }