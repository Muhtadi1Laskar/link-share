import { login, signup } from "../services/authentication.service.js";
import { successResponse } from "../utils/response.js";

export async function SignupController(req, res, next) {
    try {
        const response = await signup(req.body);
        successResponse(res, response, 201);
    } catch (error) {
        next(error);
    }
}

export async function LoginController(req, res, next) {
    try {
        const token = await login(req.body);
        successResponse(res, token, 200);
    } catch (error) {
        next(error);
    }
}