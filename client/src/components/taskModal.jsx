import { useEffect, useRef, useState } from "react";

import {
    X,
    Plus,
    CalendarDays,
    AlertCircle,
    ClipboardCheck,
    CircleDot,
    Flag,
    Sparkles,
    Loader2,
} from "lucide-react";

import api from "../services/api";

const TaskModal = ({
    isOpen,
    onClose,
    onTaskCreated,
}) => {
    const dateInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        due_date: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // --------------------------------------------------
    // RESET FORM WHEN MODAL OPENS
    // --------------------------------------------------

    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: "",
                description: "",
                status: "Pending",
                priority: "Medium",
                due_date: "",
            });

            setError("");
            setLoading(false);
        }
    }, [isOpen]);

    // --------------------------------------------------
    // OPEN NATIVE DATE PICKER
    // --------------------------------------------------

    const openDatePicker = () => {
        if (loading) {
            return;
        }

        const input = dateInputRef.current;

        if (!input) {
            return;
        }

        if (typeof input.showPicker === "function") {
            input.showPicker();
        } else {
            input.focus();
        }
    };

    // --------------------------------------------------
    // SET TODAY
    // --------------------------------------------------

    const setToday = () => {
        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        setFormData((prev) => ({
            ...prev,
            due_date: `${year}-${month}-${day}`,
        }));

        setError("");
    };

    // --------------------------------------------------
    // CLEAR DATE
    // --------------------------------------------------

    const clearDate = () => {
        setFormData((prev) => ({
            ...prev,
            due_date: "",
        }));
    };

    // --------------------------------------------------
    // HANDLE INPUT
    // --------------------------------------------------

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    // --------------------------------------------------
    // CREATE TASK
    // --------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError(
                "Please enter a task title."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");

            await api.post("/tasks", {
                title: formData.title.trim(),
                description:
                    formData.description.trim(),
                status: formData.status,
                priority: formData.priority,
                due_date:
                    formData.due_date || null,
            });

            await onTaskCreated();

            onClose();
        } catch (err) {
            console.error(
                "Create Task Error:",
                err
            );

            if (
                err.response?.status === 401
            ) {
                setError(
                    "Your session has expired. Please login again."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                        "Unable to create task. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // PRIORITY OPTIONS
    // --------------------------------------------------

    const priorityOptions = [
        {
            value: "Low",
            label: "Low",
            description: "Can wait",
            icon: "↓",
            normal:
                "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/20",
            active:
                "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/15 dark:bg-emerald-950/40",
            text:
                "text-emerald-700 dark:text-emerald-400",
        },
        {
            value: "Medium",
            label: "Medium",
            description: "Normal priority",
            icon: "→",
            normal:
                "border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20",
            active:
                "border-amber-500 bg-amber-50 ring-2 ring-amber-500/15 dark:bg-amber-950/40",
            text:
                "text-amber-700 dark:text-amber-400",
        },
        {
            value: "High",
            label: "High",
            description: "Needs attention",
            icon: "↑",
            normal:
                "border-rose-200 bg-rose-50/70 dark:border-rose-900/60 dark:bg-rose-950/20",
            active:
                "border-rose-500 bg-rose-50 ring-2 ring-rose-500/15 dark:bg-rose-950/40",
            text:
                "text-rose-700 dark:text-rose-400",
        },
    ];

    // --------------------------------------------------
    // STATUS OPTIONS
    // --------------------------------------------------

    const statusOptions = [
        {
            value: "Pending",
            label: "Pending",
            description: "Not started",
            dot: "bg-slate-400",
        },
        {
            value: "In Progress",
            label: "In Progress",
            description: "Currently working",
            dot: "bg-indigo-500",
        },
        {
            value: "Completed",
            label: "Completed",
            description: "Finished",
            dot: "bg-emerald-500",
        },
    ];

    // --------------------------------------------------
    // CLOSED
    // --------------------------------------------------

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-slate-950/65
                p-3
                backdrop-blur-md
                sm:p-5
            "
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >
            <div
                className="
                    relative
                    flex
                    max-h-[94vh]
                    w-full
                    max-w-2xl
                    flex-col
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-slate-200
                    bg-white
                    shadow-[0_35px_100px_-30px_rgba(15,23,42,0.55)]
                    dark:border-slate-700
                    dark:bg-[#0c1220]
                "
            >
                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div
                    className="
                        relative
                        overflow-hidden
                        border-b
                        border-slate-200
                        px-5
                        py-5
                        sm:px-7
                        sm:py-6
                        dark:border-slate-800
                    "
                >
                    {/* Background decoration */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-12
                            -top-20
                            h-48
                            w-48
                            rounded-full
                            bg-indigo-500/10
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-16
                            left-1/3
                            h-32
                            w-32
                            rounded-full
                            bg-blue-500/5
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            relative
                            flex
                            items-start
                            justify-between
                            gap-4
                        "
                    >
                        <div
                            className="
                                flex
                                min-w-0
                                items-start
                                gap-4
                            "
                        >
                            {/* Task Icon */}
                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-indigo-600
                                    text-white
                                    shadow-lg
                                    shadow-indigo-600/25
                                "
                            >
                                <ClipboardCheck
                                    size={23}
                                    strokeWidth={2.2}
                                />
                            </div>

                            <div className="min-w-0">
                                <div
                                    className="
                                        mb-1.5
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <Sparkles
                                        size={13}
                                        className="text-indigo-500"
                                    />

                                    <span
                                        className="
                                            text-[10px]
                                            font-black
                                            uppercase
                                            tracking-[0.18em]
                                            text-indigo-600
                                            dark:text-indigo-400
                                        "
                                    >
                                        Task workspace
                                    </span>
                                </div>

                                <h2
                                    className="
                                        text-xl
                                        font-black
                                        tracking-tight
                                        text-slate-950
                                        sm:text-2xl
                                        dark:text-white
                                    "
                                >
                                    Create new task
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        max-w-lg
                                        text-xs
                                        leading-5
                                        text-slate-500
                                        sm:text-sm
                                        dark:text-slate-400
                                    "
                                >
                                    Add the details,
                                    choose a priority,
                                    and set a deadline.
                                </p>
                            </div>
                        </div>

                        {/* Close */}
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            aria-label="Close"
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                text-slate-500
                                transition-all
                                hover:scale-105
                                hover:border-slate-300
                                hover:bg-slate-100
                                hover:text-slate-900
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                dark:border-slate-700
                                dark:bg-slate-800
                                dark:text-slate-400
                                dark:hover:bg-slate-700
                                dark:hover:text-white
                            "
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* ================================================= */}
                {/* FORM */}
                {/* ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        flex-1
                        overflow-y-auto
                        px-5
                        py-5
                        sm:px-7
                    "
                >
                    <div className="space-y-6">

                        {/* ================================================= */}
                        {/* ERROR */}
                        {/* ================================================= */}

                        {error && (
                            <div
                                className="
                                    flex
                                    items-start
                                    gap-3
                                    rounded-2xl
                                    border
                                    border-rose-200
                                    bg-rose-50
                                    px-4
                                    py-3.5
                                    text-sm
                                    text-rose-700
                                    dark:border-rose-900/60
                                    dark:bg-rose-950/30
                                    dark:text-rose-300
                                "
                            >
                                <AlertCircle
                                    size={18}
                                    className="
                                        mt-0.5
                                        shrink-0
                                    "
                                />

                                <span className="leading-5">
                                    {error}
                                </span>
                            </div>
                        )}

                        {/* ================================================= */}
                        {/* TITLE */}
                        {/* ================================================= */}

                        <div>
                            <div
                                className="
                                    mb-2
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <label
                                    htmlFor="task-title"
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-800
                                        dark:text-slate-200
                                    "
                                >
                                    Task title
                                </label>

                                <span
                                    className="
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-slate-400
                                    "
                                >
                                    Required
                                </span>
                            </div>

                            <input
                                id="task-title"
                                type="text"
                                name="title"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="What needs to be done?"
                                disabled={loading}
                                autoFocus
                                maxLength={200}
                                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    px-4
                                    py-3.5
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
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    dark:border-slate-700
                                    dark:bg-slate-800/70
                                    dark:text-white
                                    dark:placeholder:text-slate-500
                                    dark:focus:bg-slate-800
                                "
                            />
                        </div>

                        {/* ================================================= */}
                        {/* DESCRIPTION */}
                        {/* ================================================= */}

                        <div>
                            <div
                                className="
                                    mb-2
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <label
                                    htmlFor="task-description"
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-800
                                        dark:text-slate-200
                                    "
                                >
                                    Description
                                </label>

                                <span
                                    className="
                                        text-[11px]
                                        text-slate-400
                                    "
                                >
                                    {
                                        formData
                                            .description
                                            .length
                                    }
                                    /1000
                                </span>
                            </div>

                            <textarea
                                id="task-description"
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Add context, requirements, notes..."
                                rows={4}
                                maxLength={1000}
                                disabled={loading}
                                className="
                                    w-full
                                    resize-none
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    px-4
                                    py-3.5
                                    text-sm
                                    leading-6
                                    text-slate-900
                                    outline-none
                                    transition-all
                                    placeholder:text-slate-400
                                    hover:border-slate-300
                                    focus:border-indigo-500
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-indigo-500/10
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    dark:border-slate-700
                                    dark:bg-slate-800/70
                                    dark:text-white
                                    dark:placeholder:text-slate-500
                                    dark:focus:bg-slate-800
                                "
                            />
                        </div>

                        {/* ================================================= */}
                        {/* PRIORITY */}
                        {/* ================================================= */}

                        <div>
                            <div
                                className="
                                    mb-3
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <Flag
                                    size={15}
                                    className="text-indigo-500"
                                />

                                <span
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-800
                                        dark:text-slate-200
                                    "
                                >
                                    Priority
                                </span>
                            </div>

                            <div
                                className="
                                    grid
                                    grid-cols-3
                                    gap-2.5
                                "
                            >
                                {priorityOptions.map(
                                    (option) => {
                                        const active =
                                            formData.priority ===
                                            option.value;

                                        return (
                                            <button
                                                key={
                                                    option.value
                                                }
                                                type="button"
                                                disabled={
                                                    loading
                                                }
                                                onClick={() =>
                                                    setFormData(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            priority:
                                                                option.value,
                                                        })
                                                    )
                                                }
                                                className={`
                                                    rounded-2xl
                                                    border
                                                    p-3
                                                    text-left
                                                    transition-all
                                                    hover:-translate-y-0.5
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-60
                                                    ${
                                                        active
                                                            ? option.active
                                                            : option.normal
                                                    }
                                                `}
                                            >
                                                <div
                                                    className={`
                                                        flex
                                                        items-center
                                                        justify-between
                                                        ${option.text}
                                                    `}
                                                >
                                                    <span className="text-lg font-black">
                                                        {
                                                            option.icon
                                                        }
                                                    </span>

                                                    {active && (
                                                        <span className="h-2 w-2 rounded-full bg-current" />
                                                    )}
                                                </div>

                                                <div
                                                    className={`
                                                        mt-2
                                                        text-xs
                                                        font-black
                                                        ${option.text}
                                                    `}
                                                >
                                                    {
                                                        option.label
                                                    }
                                                </div>

                                                <div
                                                    className="
                                                        mt-0.5
                                                        hidden
                                                        text-[10px]
                                                        text-slate-400
                                                        sm:block
                                                    "
                                                >
                                                    {
                                                        option.description
                                                    }
                                                </div>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* ================================================= */}
                        {/* STATUS */}
                        {/* ================================================= */}

                        <div>
                            <div
                                className="
                                    mb-3
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <CircleDot
                                    size={15}
                                    className="text-indigo-500"
                                />

                                <span
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-800
                                        dark:text-slate-200
                                    "
                                >
                                    Status
                                </span>
                            </div>

                            <div
                                className="
                                    grid
                                    gap-2
                                    sm:grid-cols-3
                                "
                            >
                                {statusOptions.map(
                                    (option) => {
                                        const active =
                                            formData.status ===
                                            option.value;

                                        return (
                                            <button
                                                key={
                                                    option.value
                                                }
                                                type="button"
                                                disabled={
                                                    loading
                                                }
                                                onClick={() =>
                                                    setFormData(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            status:
                                                                option.value,
                                                        })
                                                    )
                                                }
                                                className={`
                                                    rounded-2xl
                                                    border
                                                    px-3
                                                    py-3
                                                    text-left
                                                    transition-all
                                                    hover:-translate-y-0.5
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-60
                                                    ${
                                                        active
                                                            ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/10 dark:border-indigo-500 dark:bg-indigo-950/30"
                                                            : "border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-slate-600"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`
                                                            h-2.5
                                                            w-2.5
                                                            rounded-full
                                                            ${option.dot}
                                                        `}
                                                    />

                                                    <span
                                                        className={`
                                                            text-xs
                                                            font-bold
                                                            ${
                                                                active
                                                                    ? "text-indigo-700 dark:text-indigo-300"
                                                                    : "text-slate-700 dark:text-slate-200"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            option.label
                                                        }
                                                    </span>
                                                </div>

                                                <p
                                                    className="
                                                        mt-1
                                                        text-[10px]
                                                        text-slate-400
                                                    "
                                                >
                                                    {
                                                        option.description
                                                    }
                                                </p>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* ================================================= */}
                        {/* DUE DATE */}
                        {/* ================================================= */}

                        <div>
                            <div
                                className="
                                    mb-3
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <div className="flex items-center gap-2">
                                    <CalendarDays
                                        size={15}
                                        className="text-indigo-500"
                                    />

                                    <label
                                        htmlFor="task-due-date"
                                        className="
                                            text-sm
                                            font-bold
                                            text-slate-800
                                            dark:text-slate-200
                                        "
                                    >
                                        Due date
                                    </label>
                                </div>

                                <span
                                    className="
                                        rounded-full
                                        bg-slate-100
                                        px-2.5
                                        py-1
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-slate-400
                                        dark:bg-slate-800
                                        dark:text-slate-500
                                    "
                                >
                                    Optional
                                </span>
                            </div>

                            {/* DATE CARD */}
                            <div
                                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    transition-all
                                    hover:border-indigo-300
                                    focus-within:border-indigo-500
                                    focus-within:ring-4
                                    focus-within:ring-indigo-500/10
                                    dark:border-slate-700
                                    dark:bg-slate-800/70
                                    dark:hover:border-indigo-600
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                    "
                                >
                                    {/* Calendar icon */}
                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-indigo-100
                                            text-indigo-600
                                            dark:bg-indigo-500/10
                                            dark:text-indigo-400
                                        "
                                    >
                                        <CalendarDays
                                            size={19}
                                        />
                                    </div>

                                    {/* Native date input */}
                                    <input
                                        ref={
                                            dateInputRef
                                        }
                                        id="task-due-date"
                                        type="date"
                                        name="due_date"
                                        value={
                                            formData.due_date
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        onClick={
                                            openDatePicker
                                        }
                                        disabled={
                                            loading
                                        }
                                        className="
                                            min-w-0
                                            flex-1
                                            cursor-pointer
                                            bg-transparent
                                            py-2
                                            text-sm
                                            font-semibold
                                            text-slate-800
                                            outline-none
                                            [color-scheme:light]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                            dark:text-slate-100
                                            dark:[color-scheme:dark]
                                        "
                                    />

                                    {/* Clear */}
                                    {formData.due_date && (
                                        <button
                                            type="button"
                                            onClick={
                                                clearDate
                                            }
                                            disabled={
                                                loading
                                            }
                                            className="
                                                flex
                                                h-8
                                                w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                text-slate-400
                                                transition
                                                hover:bg-rose-50
                                                hover:text-rose-500
                                                dark:hover:bg-rose-950/30
                                                dark:hover:text-rose-400
                                            "
                                            aria-label="Clear due date"
                                        >
                                            <X
                                                size={
                                                    15
                                                }
                                            />
                                        </button>
                                    )}
                                </div>

                                {/* Date actions */}
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        border-t
                                        border-slate-200
                                        px-4
                                        py-2
                                        dark:border-slate-700
                                    "
                                >
                                    <span
                                        className="
                                            text-[11px]
                                            text-slate-400
                                        "
                                    >
                                        Select a deadline
                                    </span>

                                    <button
                                        type="button"
                                        onClick={
                                            setToday
                                        }
                                        disabled={
                                            loading
                                        }
                                        className="
                                            rounded-lg
                                            px-2.5
                                            py-1.5
                                            text-[11px]
                                            font-bold
                                            text-indigo-600
                                            transition
                                            hover:bg-indigo-50
                                            dark:text-indigo-400
                                            dark:hover:bg-indigo-950/40
                                        "
                                    >
                                        Today
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================================================= */}
                    {/* FOOTER */}
                    {/* ================================================= */}

                    <div
                        className="
                            mt-7
                            flex
                            flex-col-reverse
                            gap-2.5
                            border-t
                            border-slate-200
                            pt-5
                            sm:flex-row
                            sm:justify-end
                            dark:border-slate-800
                        "
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-slate-700
                                transition-all
                                hover:bg-slate-50
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                dark:border-slate-700
                                dark:bg-slate-900
                                dark:text-slate-200
                                dark:hover:bg-slate-800
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-indigo-600
                                px-6
                                py-3
                                text-sm
                                font-black
                                text-white
                                shadow-lg
                                shadow-indigo-600/20
                                transition-all
                                hover:-translate-y-0.5
                                hover:bg-indigo-700
                                hover:shadow-xl
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={17}
                                        className="animate-spin"
                                    />

                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus
                                        size={17}
                                    />

                                    Create Task
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;