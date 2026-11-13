import bcrypt from "bcrypt";
import pool from "../config/database.js";
import { ApiError } from "../utils/error.js";
import { createUser, userExists } from "../repository/users.repository.js";

export const signup = async ({
    firstName,
    lastName,
    emails,
    password
}) => {
    const existing = await userExists(emails);

    if (existing) throw new ApiError(409, "User already exists with the given email");

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
        firstName,
        lastName,
        emails,
        password_hash: encryptedPassword
    });

    if (!user) throw new ApiError(200, "Failed to create the user");

    return {
        message: "Successfully created the user"
    };
}