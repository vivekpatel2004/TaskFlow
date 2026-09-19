const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ==========================================
// ENVIRONMENT
// ==========================================

const isProduction =
    process.env.NODE_ENV === "production";

const allowedOrigins = [
    process.env.FRONTEND_URL,
].filter(Boolean);

// ==========================================
// CORS
// ==========================================

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without Origin
            // such as Postman/server-to-server requests.
            if (!origin) {
                return callback(null, true);
            }

            // Development
            if (!isProduction) {
                return callback(null, true);
            }

            // Production
            if (
                allowedOrigins.includes(origin)
            ) {
                return callback(null, true);
            }

            return callback(
                new Error("CORS origin not allowed.")
            );
        },
        credentials: true,
        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS",
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],
    })
);

// ==========================================
// BODY PARSING
// ==========================================

app.use(
    express.json({
        limit: "5mb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "5mb",
    })
);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TaskFlow API is running.",
    });
});

// ==========================================
// API ROUTES
// ==========================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/users",
    userRoutes
);

app.use(
    "/api/tasks",
    taskRoutes
);

// ==========================================
// 404
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use(
    (error, req, res, next) => {
        console.error(
            "Global Error:",
            error.message
        );

        // CORS error
        if (
            error.message ===
            "CORS origin not allowed."
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Request origin is not allowed.",
            });
        }

        // Invalid JSON
        if (
            error instanceof SyntaxError &&
            error.status === 400 &&
            error.type ===
                "entity.parse.failed"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid request data.",
            });
        }

        // Payload too large
        if (
            error.type ===
            "entity.too.large"
        ) {
            return res.status(413).json({
                success: false,
                message:
                    "Request data is too large.",
            });
        }

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong. Please try again later.",
        });
    }
);

// ==========================================
// SERVER
// ==========================================

const PORT =
    Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(
        `TaskFlow server running on port ${PORT}`
    );
});