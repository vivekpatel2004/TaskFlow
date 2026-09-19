const db = require("../config/db");

// =========================
// Allowed Values
// =========================

const ALLOWED_STATUS = [
    "Pending",
    "In Progress",
    "Completed",
];

const ALLOWED_PRIORITY = [
    "Low",
    "Medium",
    "High",
];

// =========================
// Helper: Normalize Date
// =========================

const normalizeDueDate = (date) => {
    if (!date) {
        return null;
    }

    // Already MySQL DATE format
    if (
        typeof date === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {
        return date;
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return null;
    }

    return parsedDate.toISOString().split("T")[0];
};

// =========================
// Create Task
// =========================

const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            due_date,
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Task title is required.",
            });
        }

        if (
            status &&
            !ALLOWED_STATUS.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid task status.",
            });
        }

        if (
            priority &&
            !ALLOWED_PRIORITY.includes(priority)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid task priority.",
            });
        }

        const normalizedDueDate =
            normalizeDueDate(due_date);

        if (due_date && !normalizedDueDate) {
            return res.status(400).json({
                success: false,
                message: "Invalid due date.",
            });
        }

        const [result] = await db.query(
            `
            INSERT INTO tasks
            (
                title,
                description,
                status,
                priority,
                due_date,
                user_id
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                title.trim(),
                description?.trim() || null,
                status || "Pending",
                priority || "Medium",
                normalizedDueDate,
                req.user.id,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Task created successfully.",
            taskId: result.insertId,
        });
    } catch (error) {
        console.error(
            "Create Task Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong. Please try again later.",
        });
    }
};

// =========================
// Get All Tasks
// =========================

const getTasks = async (req, res) => {
    try {
        const [tasks] = await db.query(
            `
            SELECT
                id,
                title,
                description,
                status,
                priority,
                due_date,
                created_at,
                updated_at
            FROM tasks
            WHERE user_id = ?
            ORDER BY created_at DESC
            `,
            [req.user.id]
        );

        return res.json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        console.error(
            "Get Tasks Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong. Please try again later.",
        });
    }
};

// =========================
// Get Single Task
// =========================

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const [tasks] = await db.query(
            `
            SELECT
                id,
                title,
                description,
                status,
                priority,
                due_date,
                created_at,
                updated_at
            FROM tasks
            WHERE id = ? AND user_id = ?
            `,
            [
                id,
                req.user.id,
            ]
        );

        if (tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        return res.json({
            success: true,
            task: tasks[0],
        });
    } catch (error) {
        console.error(
            "Get Task Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong. Please try again later.",
        });
    }
};

// =========================
// Update Task
// =========================

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            status,
            priority,
            due_date,
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Task title is required.",
            });
        }

        if (
            status &&
            !ALLOWED_STATUS.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid task status.",
            });
        }

        if (
            priority &&
            !ALLOWED_PRIORITY.includes(priority)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid task priority.",
            });
        }

        const normalizedDueDate =
            normalizeDueDate(due_date);

        if (due_date && !normalizedDueDate) {
            return res.status(400).json({
                success: false,
                message: "Invalid due date.",
            });
        }

        const [result] = await db.query(
            `
            UPDATE tasks
            SET
                title = ?,
                description = ?,
                status = ?,
                priority = ?,
                due_date = ?
            WHERE id = ? AND user_id = ?
            `,
            [
                title.trim(),
                description?.trim() || null,
                status || "Pending",
                priority || "Medium",
                normalizedDueDate,
                id,
                req.user.id,
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        const [updatedTasks] = await db.query(
            `
            SELECT
                id,
                title,
                description,
                status,
                priority,
                due_date,
                created_at,
                updated_at
            FROM tasks
            WHERE id = ? AND user_id = ?
            `,
            [
                id,
                req.user.id,
            ]
        );

        return res.json({
            success: true,
            message: "Task updated successfully.",
            task: updatedTasks[0],
        });
    } catch (error) {
        console.error(
            "Update Task Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong. Please try again later.",
        });
    }
};

// =========================
// Delete Task
// =========================

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            `
            DELETE FROM tasks
            WHERE id = ? AND user_id = ?
            `,
            [
                id,
                req.user.id,
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        return res.json({
            success: true,
            message: "Task deleted successfully.",
        });
    } catch (error) {
        console.error(
            "Delete Task Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong. Please try again later.",
        });
    }
};

// =========================
// Export
// =========================

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};