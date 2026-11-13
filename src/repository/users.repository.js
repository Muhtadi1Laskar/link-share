import pool from "../config/database.js";

export const findUsers = async (email) => {
    const queryStr = `
        SELECT * 
        FROM users 
        WHERE emails = $1
    `;
    const result = await pool.query(queryStr, [email]);

    return result.rows[0] ?? null;
}

export const userExists = async (email) => {
    const queryStr = `
        SELECT
        EXISTS(SELECT 1 FROM users WHERE emails = $1)
    `;
    const result = await pool.query(queryStr, [email]);

    return result.rows[0].exists;
}

export const createUser = async ({
    firstName,
    lastName,
    emails,
    password_hash
}) => {
    const queryStr = `
        INSERT INTO
        users (first_name, last_name, emails, password_hash)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `;
    const result = await pool.query(
        queryStr, 
        [firstName, lastName, emails, password_hash]
    );

    return result.rows[0] ?? null;
}