import { useState } from "react";
import { motion } from "framer-motion";

import {
    CalendarDays,
    Pencil,
    Trash2,
    CheckCircle2,
    Clock3,
    Circle,
    Flag,
    AlertCircle,
    Loader2,
    ArrowRight,
} from "lucide-react";

import api from "../services/api";

const TaskCard = ({
    task,
    onEdit,
    onDelete,
    onTaskUpdated,
}) => {
    const [updatingStatus, setUpdatingStatus] = useState(false);

    // =========================
    // Status Configuration
    // =========================

    const getStatusConfig = () => {
        if (task.status === "Completed") {
            return {
                icon: <CheckCircle2 size={15} />,
                label: "Completed",
                classes:
                    "bg-emerald-50 text-emerald-700 border-emerald-200 " +
                    "dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/60",
            };
        }

        if (task.status === "In Progress") {
            return {
                icon: <Clock3 size={15} />,
                label: "In Progress",
                classes:
                    "bg-blue-50 text-blue-700 border-blue-200 " +
                    "dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/60",
            };
        }

        return {
            icon: <Circle size={15} />,
            label: "Pending",
            classes:
                "bg-amber-50 text-amber-700 border-amber-200 " +
                "dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60",
        };
    };

    // =========================
    // Priority Configuration
    // =========================

    const getPriorityConfig = () => {
        if (task.priority === "High") {
            return {
                label: "High",
                classes:
                    "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
            };
        }

        if (task.priority === "Low") {
            return {
                label: "Low",
                classes:
                    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
            };
        }

        return {
            label: "Medium",
            classes:
                "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
        };
    };

    // =========================
    // Next Status
    // =========================

    const getNextStatus = () => {
        if (task.status === "Pending") {
            return "In Progress";
        }

        if (task.status === "In Progress") {
            return "Completed";
        }

        return "Pending";
    };

    // =========================
    // Format Date
    // =========================

    const formatDate = (date) => {
        if (!date) {
            return "No due date";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "No due date";
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // =========================
    // Due Date Monitoring
    // =========================

    const getDueInfo = () => {
        if (!task.due_date) {
            return {
                label: "No due date",
                subText: "Not scheduled",
                type: "normal",
                icon: <CalendarDays size={16} />,
                classes:
                    "text-slate-500 dark:text-slate-400",
                bg:
                    "bg-slate-50 dark:bg-slate-800/70",
            };
        }

        if (task.status === "Completed") {
            return {
                label: formatDate(task.due_date),
                subText: "Completed",
                type: "completed",
                icon: <CheckCircle2 size={16} />,
                classes:
                    "text-emerald-600 dark:text-emerald-400",
                bg:
                    "bg-emerald-50 dark:bg-emerald-950/30",
            };
        }

        const today = new Date();
        const dueDate = new Date(task.due_date);

        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        const difference =
            dueDate.getTime() - today.getTime();

        const daysRemaining = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

        // Overdue
        if (daysRemaining < 0) {
            const daysOverdue = Math.abs(daysRemaining);

            return {
                label:
                    daysOverdue === 1
                        ? "Overdue by 1 day"
                        : `Overdue by ${daysOverdue} days`,
                subText: formatDate(task.due_date),
                type: "overdue",
                icon: <AlertCircle size={16} />,
                classes:
                    "text-red-600 dark:text-red-400",
                bg:
                    "bg-red-50 dark:bg-red-950/30",
            };
        }

        // Due today
        if (daysRemaining === 0) {
            return {
                label: "Due today",
                subText: formatDate(task.due_date),
                type: "today",
                icon: <AlertCircle size={16} />,
                classes:
                    "text-red-600 dark:text-red-400",
                bg:
                    "bg-red-50 dark:bg-red-950/30",
            };
        }

        // Due tomorrow
        if (daysRemaining === 1) {
            return {
                label: "Due tomorrow",
                subText: formatDate(task.due_date),
                type: "tomorrow",
                icon: <Clock3 size={16} />,
                classes:
                    "text-orange-600 dark:text-orange-400",
                bg:
                    "bg-orange-50 dark:bg-orange-950/30",
            };
        }

        // Due within 7 days
        if (daysRemaining <= 7) {
            return {
                label: `Due in ${daysRemaining} days`,
                subText: formatDate(task.due_date),
                type: "soon",
                icon: <Clock3 size={16} />,
                classes:
                    "text-orange-600 dark:text-orange-400",
                bg:
                    "bg-orange-50 dark:bg-orange-950/30",
            };
        }

        // Normal
        return {
            label: formatDate(task.due_date),
            subText: "Upcoming",
            type: "normal",
            icon: <CalendarDays size={16} />,
            classes:
                "text-slate-600 dark:text-slate-300",
            bg:
                "bg-slate-50 dark:bg-slate-800/70",
        };
    };

    // =========================
    // Update Status
    // =========================

    const handleStatusChange = async () => {
        const nextStatus = getNextStatus();

        try {
            setUpdatingStatus(true);

            await api.put(`/tasks/${task.id}`, {
                title: task.title,
                description: task.description || "",
                status: nextStatus,
                priority: task.priority,
                due_date: task.due_date || null,
            });

            if (onTaskUpdated) {
                await onTaskUpdated();
            }
        } catch (error) {
            console.error(
                "Update Status Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to update task status."
            );
        } finally {
            setUpdatingStatus(false);
        }
    };

    const statusConfig = getStatusConfig();
    const priorityConfig = getPriorityConfig();
    const dueInfo = getDueInfo();

    // =========================
    // Render
    // =========================

    return (
        <motion.div
            layout
            initial={{
                opacity: 0,
                y: 12,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            whileHover={{
                y: -4,
            }}
            transition={{
                duration: 0.2,
            }}
            className="
                group
                relative
                overflow-hidden
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-800
                rounded-2xl
                p-5
                shadow-sm
                dark:shadow-black/20
                hover:shadow-xl
                dark:hover:shadow-black/30
                hover:border-indigo-200
                dark:hover:border-indigo-900
                transition-all
                duration-300
            "
        >
            {/* Top Accent */}

            <div
                className={`
                    absolute
                    top-0
                    left-0
                    w-full
                    h-1
                    ${
                        task.status === "Completed"
                            ? "bg-emerald-500"
                            : task.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-amber-400"
                    }
                `}
            />

            {/* =========================
                Header
            ========================= */}

            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                        {/* Task Icon */}

                        <div
                            className="
                                shrink-0
                                w-9
                                h-9
                                rounded-xl
                                bg-indigo-50
                                dark:bg-indigo-950/40
                                text-indigo-600
                                dark:text-indigo-400
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <Circle size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3
                                className={`
                                    text-[15px]
                                    font-bold
                                    leading-5
                                    break-words
                                    ${
                                        task.status ===
                                        "Completed"
                                            ? "text-slate-400 dark:text-slate-500 line-through"
                                            : "text-slate-900 dark:text-white"
                                    }
                                `}
                            >
                                {task.title}
                            </h3>

                            {task.description && (
                                <p
                                    className="
                                        mt-1.5
                                        text-sm
                                        leading-5
                                        text-slate-500
                                        dark:text-slate-400
                                        line-clamp-2
                                    "
                                >
                                    {task.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}

                <div
                    className="
                        flex
                        items-center
                        gap-1
                        opacity-100
                        sm:opacity-0
                        sm:group-hover:opacity-100
                        transition-opacity
                    "
                >
                    <button
                        type="button"
                        onClick={() => onEdit(task)}
                        className="
                            w-8
                            h-8
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            dark:text-slate-500
                            hover:text-indigo-600
                            dark:hover:text-indigo-400
                            hover:bg-indigo-50
                            dark:hover:bg-indigo-950/50
                            transition-all
                        "
                        title="Edit task"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(task.id)}
                        className="
                            w-8
                            h-8
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            dark:text-slate-500
                            hover:text-red-600
                            dark:hover:text-red-400
                            hover:bg-red-50
                            dark:hover:bg-red-950/40
                            transition-all
                        "
                        title="Delete task"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* =========================
                Status + Priority
            ========================= */}

            <div
                className="
                    mt-5
                    flex
                    flex-wrap
                    items-center
                    gap-2
                "
            >
                <button
                    type="button"
                    onClick={handleStatusChange}
                    disabled={updatingStatus}
                    title={`Change status to ${getNextStatus()}`}
                    className={`
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1.5
                        rounded-full
                        border
                        text-xs
                        font-semibold
                        hover:shadow-sm
                        active:scale-95
                        transition-all
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                        ${statusConfig.classes}
                    `}
                >
                    {updatingStatus ? (
                        <Loader2
                            size={14}
                            className="animate-spin"
                        />
                    ) : (
                        statusConfig.icon
                    )}

                    {updatingStatus
                        ? "Updating..."
                        : statusConfig.label}
                </button>

                <span
                    className={`
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-semibold
                        ${priorityConfig.classes}
                    `}
                >
                    <Flag size={13} />
                    {priorityConfig.label}
                </span>
            </div>

            {/* =========================
                Due Date Monitoring
            ========================= */}

            <div
                className={`
                    mt-5
                    flex
                    items-center
                    justify-between
                    gap-3
                    rounded-xl
                    px-3.5
                    py-3
                    ${dueInfo.bg}
                `}
            >
                <div
                    className={`
                        flex
                        items-center
                        gap-2.5
                        min-w-0
                        ${dueInfo.classes}
                    `}
                >
                    <div className="shrink-0">
                        {dueInfo.icon}
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">
                            {dueInfo.label}
                        </p>

                        <p
                            className="
                                mt-0.5
                                text-[11px]
                                opacity-70
                                truncate
                            "
                        >
                            {dueInfo.subText}
                        </p>
                    </div>
                </div>

                {dueInfo.type !== "completed" &&
                    dueInfo.type !== "normal" && (
                        <AlertCircle
                            size={15}
                            className="
                                shrink-0
                                opacity-70
                            "
                        />
                    )}
            </div>

            {/* =========================
                Footer
            ========================= */}

            <div
                className="
                    mt-4
                    pt-4
                    border-t
                    border-slate-100
                    dark:border-slate-800
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >
                <span
                    className="
                        text-[11px]
                        font-medium
                        text-slate-400
                        dark:text-slate-500
                    "
                >
                    Task #{task.id}
                </span>

                <button
                    type="button"
                    onClick={handleStatusChange}
                    disabled={updatingStatus}
                    className="
                        inline-flex
                        items-center
                        gap-1
                        text-[11px]
                        font-semibold
                        text-indigo-600
                        dark:text-indigo-400
                        hover:text-indigo-700
                        dark:hover:text-indigo-300
                        transition-colors
                        disabled:opacity-50
                    "
                >
                    {task.status === "Completed"
                        ? "Reopen"
                        : "Move forward"}

                    <ArrowRight size={13} />
                </button>
            </div>
        </motion.div>
    );
};

export default TaskCard;