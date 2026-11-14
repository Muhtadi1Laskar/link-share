import pool from "../config/database.js";

export const retriveLinks = async (userId) => {
    const queryStr = `
        SELECT * FROM links WHERE user_id = $1
    `;
    const result = await pool.query(queryStr, [userId]);

    return result.rows ?? null;
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
        ON CONFLICT (user_id, link) DO NOTHING
        RETURNING *
    `;
    const result = await pool.query(queryStr, [
        userId,
        websiteName,
        link
    ]);
    return result.rows[0] ?? null;
}

export const deleteLinks = async (userId, linkId) => {
    const queryStr = `
        DELETE FROM links
        WHERE user_id = $1 AND link_id = $2
        RETURNING *
    `;
    const result = await pool.query(queryStr, [userId, linkId]);

    return result.rows[0] ?? null;
}

export const doLinkExists = async (userId, linkId) => {
    const queryStr = `
        SELECT 
        EXISTS(SELECT 1 FROM links WHERE user_id = $1 AND link_id = $2)
    `;
    const result = await pool.query(queryStr, [userId, linkId]);
    
    return result.rows[0].exists ?? null;
}
