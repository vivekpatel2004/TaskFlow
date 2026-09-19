const db = require("../config/db");

// ==========================================
// GET PROFILE
// GET /api/users/profile
// ==========================================

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await db.query(
            `
            SELECT
                id,
                name,
                email,
                bio,
                job_title,
                location,
                phone,
                website,
                linkedin,
                github,
                skills,
                experience_level,
                company,
                department,
                employment_type,
                work_mode,
                preferred_location,
                availability,
                profile_image,
                created_at
            FROM users
            WHERE id = ?
            LIMIT 1
            `,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User profile not found.",
            });
        }

        return res.status(200).json({
            success: true,
            user: rows[0],
        });
    } catch (error) {
        console.error(
            "Get Profile Error:",
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
// UPDATE PROFILE
// PUT /api/users/profile
// ==========================================

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            name,
            bio,
            job_title,
            location,
            phone,
            website,
            linkedin,
            github,
            skills,
            experience_level,
            company,
            department,
            employment_type,
            work_mode,
            preferred_location,
            availability,
            profile_image,
        } = req.body;

        // Name validation
        if (
            typeof name !== "string" ||
            !name.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Name is required.",
            });
        }

        // Profile image validation
        if (
            profile_image !== undefined &&
            profile_image !== null &&
            typeof profile_image !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid profile image.",
            });
        }

        // Prevent unnecessarily large profile image data
        if (
            typeof profile_image === "string" &&
            profile_image.length > 4 * 1024 * 1024
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Profile image is too large.",
            });
        }

        const clean = (value) =>
            typeof value === "string"
                ? value.trim()
                : null;

        await db.query(
            `
            UPDATE users
            SET
                name = ?,
                bio = ?,
                job_title = ?,
                location = ?,
                phone = ?,
                website = ?,
                linkedin = ?,
                github = ?,
                skills = ?,
                experience_level = ?,
                company = ?,
                department = ?,
                employment_type = ?,
                work_mode = ?,
                preferred_location = ?,
                availability = ?,
                profile_image = ?
            WHERE id = ?
            `,
            [
                name.trim(),
                clean(bio),
                clean(job_title),
                clean(location),
                clean(phone),
                clean(website),
                clean(linkedin),
                clean(github),
                clean(skills),
                clean(experience_level),
                clean(company),
                clean(department),
                clean(employment_type),
                clean(work_mode),
                clean(preferred_location),
                clean(availability),
                profile_image || null,
                userId,
            ]
        );

        const [rows] = await db.query(
            `
            SELECT
                id,
                name,
                email,
                bio,
                job_title,
                location,
                phone,
                website,
                linkedin,
                github,
                skills,
                experience_level,
                company,
                department,
                employment_type,
                work_mode,
                preferred_location,
                availability,
                profile_image,
                created_at
            FROM users
            WHERE id = ?
            LIMIT 1
            `,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User profile not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Profile updated successfully.",
            user: rows[0],
        });
    } catch (error) {
        console.error(
            "Update Profile Error:",
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
// DELETE ACCOUNT
// DELETE /api/users/profile
// ==========================================

const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const [result] = await db.query(
            `
            DELETE FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Account deleted successfully.",
        });
    } catch (error) {
        console.error(
            "Delete Profile Error:",
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
    getProfile,
    updateProfile,
    deleteProfile,
};