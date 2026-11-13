export const successResponse = (res, body, statusCode = 200) => {
    return res.status(statusCode).json(body);
}

export const errorResponse = (res, body, statusCode = 200) => {
    return res.status(statusCode).json(body);
}