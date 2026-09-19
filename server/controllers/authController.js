const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// ==========================================
// GENERATE JWT
// ==========================================

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured.");
    }

    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

// ==========================================
// REGISTER
// POST /api/auth/register
// ==========================================

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Name validation
        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required.",
            });
        }

        // Email validation
        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        // Password validation
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required.",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters.",
            });
        }

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        // Check existing user
        const [existingUsers] = await db.query(
            `
            SELECT id
            FROM users
            WHERE email = ?
            LIMIT 1
            `,
            [normalizedEmail]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "Email is already registered.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create user
        const [result] = await db.query(
            `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
            `,
            [
                name.trim(),
                normalizedEmail,
                hashedPassword,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Registration successful.",
            userId: result.insertId,
        });
    } catch (error) {
        console.error(
            "Register Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong. Please try again later.",
        });
    }
};

// ==========================================
// LOGIN
// POST /api/auth/login
// ==========================================

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (
            !email ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required.",
            });
        }

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        // Find user
        const [users] = await db.query(
            `
            SELECT *
            FROM users
            WHERE email = ?
            LIMIT 1
            `,
            [normalizedEmail]
        );

        /*
         * Do not reveal whether the email exists.
         * This prevents account/email enumeration.
         */
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password.",
            });
        }

        const user = users[0];

        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password.",
            });
        }

        // Generate JWT
        const token = generateToken(user);

        // Never send password to frontend
        const {
            password: _password,
            ...safeUser
        } = user;

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: safeUser,
        });
    } catch (error) {
        console.error(
            "Login Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong. Please try again later.",
        });
    }
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
    register,
    login,
};