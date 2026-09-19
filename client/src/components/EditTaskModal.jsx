import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    X,
    Save,
    Loader2,
    ClipboardList,
    FileText,
    Flag,
    CalendarDays,
    CircleDot,
    CheckCircle2,
    Clock3,
    AlertCircle,
} from "lucide-react";

import api from "../services/api";

const EditTaskModal = ({
    isOpen,
    onClose,
    task,
    onTaskUpdated,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        due_date: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // Load Selected Task
    // =========================

    useEffect(() => {
        if (!task) return;

        setFormData({
            title: task.title || "",
            description: task.description || "",
            status: task.status || "Pending",
            priority: task.priority || "Medium",
            due_date: task.due_date
                ? String(task.due_date).split("T")[0]
                : "",
        });

        setError("");
    }, [task]);

    // =========================
    // Handle Change
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    // =========================
    // Update Task
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = formData.title.trim();

        if (!title) {
            setError("Task title is required.");
            return;
        }

        if (!task?.id) {
            setError("Task information is missing.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.put(
                `/tasks/${task.id}`,
                {
                    title,
                    description:
                        formData.description.trim(),
                    status: formData.status,
                    priority: formData.priority,
                    due_date:
                        formData.due_date || null,
                }
            );

            console.log(
                "UPDATE TASK RESPONSE:",
                response.data
            );

            if (onTaskUpdated) {
                await onTaskUpdated();
            }

            onClose();
        } catch (err) {
            console.error(
                "Update Task Error:",
                err
            );

            if (err.response?.status === 401) {
                setError(
                    "Your session has expired. Please login again."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                        "Failed to update task. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Close
    // =========================

    const handleClose = () => {
        if (loading) return;

        setError("");
        onClose();
    };

    // =========================
    // Status Style
    // =========================

    const getStatusStyle = (status) => {
        if (status === "Completed") {
            return {
                icon: <CheckCircle2 size={16} />,
                active:
                    "border-emerald-500 bg-emerald-50 text-emerald-700 " +
                    "dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400",
            };
        }

        if (status === "In Progress") {
            return {
                icon: <Clock3 size={16} />,
                active:
                    "border-blue-500 bg-blue-50 text-blue-700 " +
                    "dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-400",
            };
        }

        return {
            icon: <CircleDot size={16} />,
            active:
                "border-amber-500 bg-amber-50 text-amber-700 " +
                "dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-400",
        };
    };

    // =========================
    // Priority Style
    // =========================

    const getPriorityStyle = (priority) => {
        if (priority === "High") {
            return `
                border-red-500
                bg-red-50
                text-red-700
                dark:border-red-500
                dark:bg-red-950/40
                dark:text-red-400
            `;
        }

        if (priority === "Low") {
            return `
                border-slate-400
                bg-slate-50
                text-slate-700
                dark:border-slate-600
                dark:bg-slate-800
                dark:text-slate-300
            `;
        }

        return `
            border-orange-500
            bg-orange-50
            text-orange-700
            dark:border-orange-500
            dark:bg-orange-950/40
            dark:text-orange-400
        `;
    };

    const statusStyle = getStatusStyle(
        formData.status
    );

    return (
        <AnimatePresence>
            {isOpen && task && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        p-4
                        bg-slate-950/40
                        dark:bg-black/70
                        backdrop-blur-md
                    "
                    onMouseDown={handleClose}
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            y: 18,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.96,
                            y: 18,
                        }}
                        transition={{
                            duration: 0.22,
                            ease: "easeOut",
                        }}
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                        className="
                            w-full
                            max-w-xl
                            max-h-[92vh]
                            overflow-y-auto
                            rounded-[28px]
                            border
                            border-slate-200
                            dark:border-slate-800
                            bg-white
                            dark:bg-slate-900
                            shadow-2xl
                            shadow-slate-950/20
                            dark:shadow-black/60
                        "
                    >
                        {/* =========================
                            Header
                        ========================= */}

                        <div
                            className="
                                sticky
                                top-0
                                z-10
                                flex
                                items-center
                                justify-between
                                gap-4
                                px-6
                                py-5
                                bg-white/95
                                dark:bg-slate-900/95
                                backdrop-blur-xl
                                border-b
                                border-slate-100
                                dark:border-slate-800
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-indigo-50
                                        text-indigo-600
                                        dark:bg-indigo-950/50
                                        dark:text-indigo-400
                                    "
                                >
                                    <Save size={20} />
                                </div>

                                <div>
                                    <h2
                                        className="
                                            text-lg
                                            font-bold
                                            text-slate-900
                                            dark:text-white
                                        "
                                    >
                                        Edit Task
                                    </h2>

                                    <p
                                        className="
                                            mt-0.5
                                            text-xs
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        Update your task details
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    text-slate-400
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                    dark:text-slate-500
                                    dark:hover:bg-slate-800
                                    dark:hover:text-white
                                    transition-all
                                    disabled:opacity-50
                                "
                            >
                                <X size={19} />
                            </button>
                        </div>

                        {/* =========================
                            Form
                        ========================= */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 space-y-6"
                        >
                            {/* Error */}

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        className="
                                            flex
                                            items-start
                                            gap-3
                                            rounded-2xl
                                            border
                                            border-red-200
                                            bg-red-50
                                            px-4
                                            py-3
                                            text-sm
                                            text-red-600
                                            dark:border-red-900/60
                                            dark:bg-red-950/30
                                            dark:text-red-400
                                        "
                                    >
                                        <AlertCircle
                                            size={18}
                                            className="mt-0.5 shrink-0"
                                        />

                                        <span>
                                            {error}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* =========================
                                Task Title
                            ========================= */}

                            <div>
                                <label
                                    className="
                                        mb-2
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    <ClipboardList
                                        size={14}
                                    />
                                    Task Title
                                </label>

                                <div
                                    className="
                                        relative
                                        group
                                    "
                                >
                                    <ClipboardList
                                        size={18}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                            transition-colors
                                            group-focus-within:text-indigo-500
                                        "
                                    />

                                    <input
                                        type="text"
                                        name="title"
                                        value={
                                            formData.title
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. Build dashboard"
                                        disabled={loading}
                                        autoFocus
                                        className="
                                            w-full
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            py-3.5
                                            pl-11
                                            pr-4
                                            text-sm
                                            font-medium
                                            text-slate-900
                                            outline-none
                                            transition-all
                                            placeholder:text-slate-400
                                            hover:border-slate-300
                                            focus:border-indigo-500
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-indigo-500/10
                                            dark:border-slate-700
                                            dark:bg-slate-800
                                            dark:text-white
                                            dark:placeholder:text-slate-500
                                            dark:hover:border-slate-600
                                            dark:focus:bg-slate-800
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                        "
                                    />
                                </div>
                            </div>

                            {/* =========================
                                Description
                            ========================= */}

                            <div>
                                <label
                                    className="
                                        mb-2
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    <FileText size={14} />
                                    Description
                                </label>

                                <div className="relative group">
                                    <FileText
                                        size={18}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-4
                                            text-slate-400
                                            transition-colors
                                            group-focus-within:text-indigo-500
                                        "
                                    />

                                    <textarea
                                        name="description"
                                        value={
                                            formData.description
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Add some details about this task..."
                                        rows={4}
                                        disabled={loading}
                                        className="
                                            w-full
                                            resize-none
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            py-3.5
                                            pl-11
                                            pr-4
                                            text-sm
                                            text-slate-900
                                            outline-none
                                            transition-all
                                            placeholder:text-slate-400
                                            hover:border-slate-300
                                            focus:border-indigo-500
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-indigo-500/10
                                            dark:border-slate-700
                                            dark:bg-slate-800
                                            dark:text-white
                                            dark:placeholder:text-slate-500
                                            dark:hover:border-slate-600
                                            dark:focus:bg-slate-800
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                        "
                                    />
                                </div>
                            </div>

                            {/* =========================
                                Status
                            ========================= */}

                            <div>
                                <label
                                    className="
                                        mb-3
                                        block
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    Status
                                </label>

                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        {
                                            value: "Pending",
                                            icon: (
                                                <CircleDot
                                                    size={16}
                                                />
                                            ),
                                        },
                                        {
                                            value: "In Progress",
                                            icon: (
                                                <Clock3
                                                    size={16}
                                                />
                                            ),
                                        },
                                        {
                                            value: "Completed",
                                            icon: (
                                                <CheckCircle2
                                                    size={16}
                                                />
                                            ),
                                        },
                                    ].map((item) => {
                                        const active =
                                            formData.status ===
                                            item.value;

                                        return (
                                            <button
                                                key={
                                                    item.value
                                                }
                                                type="button"
                                                disabled={
                                                    loading
                                                }
                                                onClick={() =>
                                                    setFormData(
                                                        (prev) => ({
                                                            ...prev,
                                                            status: item.value,
                                                        })
                                                    )
                                                }
                                                className={`
                                                    flex
                                                    min-h-[62px]
                                                    flex-col
                                                    items-center
                                                    justify-center
                                                    gap-1.5
                                                    rounded-2xl
                                                    border
                                                    px-2
                                                    text-xs
                                                    font-semibold
                                                    transition-all
                                                    ${
                                                        active
                                                            ? getStatusStyle(
                                                                  item.value
                                                              ).active
                                                            : `
                                                                border-slate-200
                                                                bg-slate-50
                                                                text-slate-500
                                                                hover:border-slate-300
                                                                hover:bg-white
                                                                dark:border-slate-700
                                                                dark:bg-slate-800
                                                                dark:text-slate-400
                                                                dark:hover:border-slate-600
                                                              `
                                                    }
                                                `}
                                            >
                                                {item.icon}
                                                <span className="text-center">
                                                    {
                                                        item.value
                                                    }
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* =========================
                                Priority
                            ========================= */}

                            <div>
                                <label
                                    className="
                                        mb-3
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    <Flag size={14} />
                                    Priority
                                </label>

                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        "Low",
                                        "Medium",
                                        "High",
                                    ].map((priority) => {
                                        const active =
                                            formData.priority ===
                                            priority;

                                        return (
                                            <button
                                                key={
                                                    priority
                                                }
                                                type="button"
                                                disabled={
                                                    loading
                                                }
                                                onClick={() =>
                                                    setFormData(
                                                        (prev) => ({
                                                            ...prev,
                                                            priority,
                                                        })
                                                    )
                                                }
                                                className={`
                                                    flex
                                                    min-h-[50px]
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    rounded-2xl
                                                    border
                                                    text-xs
                                                    font-bold
                                                    transition-all
                                                    ${
                                                        active
                                                            ? getPriorityStyle(
                                                                  priority
                                                              )
                                                            : `
                                                                border-slate-200
                                                                bg-slate-50
                                                                text-slate-500
                                                                hover:border-slate-300
                                                                hover:bg-white
                                                                dark:border-slate-700
                                                                dark:bg-slate-800
                                                                dark:text-slate-400
                                                                dark:hover:border-slate-600
                                                              `
                                                    }
                                                `}
                                            >
                                                <Flag
                                                    size={14}
                                                />
                                                {priority}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* =========================
                                Due Date
                            ========================= */}

                            <div>
                                <label
                                    className="
                                        mb-2
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    <CalendarDays
                                        size={14}
                                    />
                                    Due Date
                                </label>

                                <div className="relative group">
                                    <CalendarDays
                                        size={18}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                            transition-colors
                                            group-focus-within:text-indigo-500
                                        "
                                    />

                                    <input
                                        type="date"
                                        name="due_date"
                                        value={
                                            formData.due_date
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        disabled={loading}
                                        className="
                                            w-full
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            py-3.5
                                            pl-11
                                            pr-4
                                            text-sm
                                            font-medium
                                            text-slate-900
                                            outline-none
                                            transition-all
                                            hover:border-slate-300
                                            focus:border-indigo-500
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-indigo-500/10
                                            dark:border-slate-700
                                            dark:bg-slate-800
                                            dark:text-white
                                            dark:hover:border-slate-600
                                            dark:focus:bg-slate-800
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                        "
                                    />
                                </div>
                            </div>

                            {/* =========================
                                Actions
                            ========================= */}

                            <div
                                className="
                                    flex
                                    flex-col-reverse
                                    gap-3
                                    border-t
                                    border-slate-100
                                    pt-5
                                    sm:flex-row
                                    sm:justify-end
                                    dark:border-slate-800
                                "
                            >
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={loading}
                                    className="
                                        h-12
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-6
                                        text-sm
                                        font-bold
                                        text-slate-600
                                        transition-all
                                        hover:bg-slate-50
                                        hover:text-slate-900
                                        dark:border-slate-700
                                        dark:bg-slate-800
                                        dark:text-slate-300
                                        dark:hover:bg-slate-700
                                        dark:hover:text-white
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        flex
                                        h-12
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-2xl
                                        bg-indigo-600
                                        px-7
                                        text-sm
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-indigo-200
                                        transition-all
                                        hover:bg-indigo-700
                                        hover:shadow-xl
                                        active:scale-[0.98]
                                        dark:shadow-indigo-950/40
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    {loading ? (
                                        <>
                                            <Loader2
                                                size={18}
                                                className="animate-spin"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditTaskModal;