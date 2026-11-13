import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";
import { createUser, findUsers, userExists } from "../repository/users.repository.js";

export const signup = async ({
    firstName,
    lastName,
    emails,
    password
}) => {
    const existing = await userExists(emails);

    if (existing) throw new ApiError(
        409, 
        "User_Already_Exists",
        "User already exists with the given email"
    );

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

export const login = async ({ email, password }) => {
    const existing = await findUsers(email);

    if (!existing) throw new ApiError(404, "User the email does not exists");

    if (!(await bcrypt.compare(password, existing.password_hash))) {
        throw new ApiError(
            403,
            "Invalid_Password", 
            "Invalid password"
        );
    }

    const payload = {
        user: {
            id: existing.user_id
        }
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        authToken: token,
        users: {
            name: `${existing.first_name} ${existing.last_name}`,
            email: existing.emails
        }
    };
}