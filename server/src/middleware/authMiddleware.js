import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const authMiddleware = async (req, res, next) => {
    try {
        // Get JWT from browser cookie
        const token = req.cookies.token;

        // No token → not authenticated
        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        // Verify JWT and get user ID
        const decoded = jwt.verify(
            token,
            process.env.JWT_PRIVATE_KEY
        );

        // Find that user in PostgreSQL
        const result = await pool.query(
            `SELECT id, name, email
             FROM users
             WHERE id = $1`,
            [decoded.id]
        );

        // User doesn't exist
        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Attach authenticated user to request
        req.user = result.rows[0];

        // Continue to the next handler
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;