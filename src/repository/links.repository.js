import pool from "../config/database.js";

export const retriveLinks = async (userId) => {
    const queryStr = `
        SELECT * 
        FROM LINKS
        WHERE user_id = $1
    `;
    const result = await pool.query(queryStr, [userId]);

    return result.rows[0] ?? null;
}

export const createLinks = async ({ 
    userId, 
    websiteName, 
    link
}) => {
    const queryStr = `
        INSERT INTO links (
            user_id, 
            website_name, 
            link
        )
        VALUES($1, $2, $3)
        ON CONFLICT (link) DO NOTHING
        RETURNING *
    `;
    const result = await pool.query(queryStr,[
        userId, 
        websiteName, 
        link
    ]);
    return result.rows[0] ?? null;
}

