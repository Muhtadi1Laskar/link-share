import bcrypt from "bcrypt";
import pool from "../config/database.js";
import { ApiError } from "../utils/error.js";

export const signup = async ({
    firstName,
    lastName,
    emails,
    password
}) => {
    const query = `
        SELECT
        EXISTS(SELECT 1 FROM users WHERE emails = $1)
    `;
    const res = await pool.query(query, [emails]);
    const existing = res.rows[0].exists;

    if (existing) throw new ApiError(409, "User already exists with the given email");

    const encryptedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
        INSERT INTO
        users (first_name, last_name, emails, password_hash)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `;

    const user = await pool.query(
        insertQuery,
        [firstName, lastName, emails, encryptedPassword]
    );

    return {
        message: "Successfully created the user"
    };
}