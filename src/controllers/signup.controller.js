import { signup } from "../services/signup.service.js";
import { successResponse } from "../utils/response.js";

export default async function SignupController(req, res, next) {
    try {
        const response = await signup(req.body);
        successResponse(res, response, 201);
    } catch (error) {
        next(error);
    }
}