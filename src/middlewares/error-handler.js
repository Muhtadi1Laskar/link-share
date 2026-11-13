import { ApiError } from "../utils/error.js";

export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    const isApiError = err instanceof ApiError;

    const statusCode =
        isApiError &&
        Number.isInteger(err.statusCode) &&
        err.statusCode >= 400 &&
        err.statusCode <= 599
            ? err.statusCode
            : 500;

    const isServerError = statusCode >= 500;

    if (isServerError) {
        req.log?.error(
            { err },
            "Unexpected server error"
        );
    }

    else {
        req.log?.warn?.(
            {
                code: err.code,
                statusCode
            },
            "Request rejected"
        );
    }

    res.status(statusCode).json({
        success: false,
        error: {
            code: isApiError
                ? err.code
                : "INTERNAL_SERVER_ERROR",

            message: isServerError
                ? "An unexpected error occurred."
                : err.message
        }
    });
}