const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // JWT secret must exist
        if (!process.env.JWT_SECRET) {
            console.error(
                "JWT_SECRET is not configured."
            );

            return res.status(500).json({
                success: false,
                message:
                    "Authentication service is unavailable.",
            });
        }

        const authHeader =
            req.headers.authorization;

        // Authorization header check
        if (
            !authHeader ||
            typeof authHeader !== "string" ||
            !authHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                success: false,
                message:
                    "Authentication required.",
            });
        }

        // Extract token
        const token = authHeader
            .slice(7)
            .trim();

        if (!token) {
            return res.status(401).json({
                success: false,
                message:
                    "Authentication required.",
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Validate JWT payload
        if (
            !decoded ||
            !decoded.id ||
            !decoded.email
        ) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid or expired token.",
            });
        }

        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        next();
    } catch (error) {
        console.error(
            "Auth Middleware Error:",
            error.name
        );

        return res.status(401).json({
            success: false,
            message:
                "Invalid or expired token.",
        });
    }
};

module.exports = authMiddleware;