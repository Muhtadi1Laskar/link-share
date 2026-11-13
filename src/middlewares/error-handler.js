export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    if(statusCode >= 500) {
        req.log?.error({ err }, "Request failed");
    }

    res.status(statusCode).json({
        error: {
            code: err.code || "INTERNAL_SERVER_ERROR",
            message: 
                statusCode >= 500
                ? "An unexcepted error occurred"
                : err.message
        }
    });
}

// export const errorHandler = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         message: err.message || "Internal server error"
//     });
// }