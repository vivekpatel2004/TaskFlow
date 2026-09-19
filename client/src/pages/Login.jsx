import { useState } from "react";

import {
    ArrowRight,
    Check,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    Sparkles,
    User,
} from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const Login = ({ mode = "login" }) => {
    const navigate = useNavigate();

    const { login, register } = useAuth();

    const { showNotification } =
        useNotification();

    /*
    --------------------------------
    MODE
    --------------------------------
    */

    const isRegister =
        mode === "register";

    /*
    --------------------------------
    STATES
    --------------------------------
    */

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    /*
    --------------------------------
    EMAIL VALIDATION
    --------------------------------
    */

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    /*
    --------------------------------
    PASSWORD RULES
    --------------------------------
    */

    const passwordRules = {
        length:
            password.length >= 8,

        uppercase:
            /[A-Z]/.test(password),

        lowercase:
            /[a-z]/.test(password),

        number:
            /[0-9]/.test(password),

        special:
            /[^A-Za-z0-9]/.test(password),
    };

    const passwordValid =
        passwordRules.length &&
        passwordRules.uppercase &&
        passwordRules.lowercase &&
        passwordRules.number &&
        passwordRules.special;

    /*
    --------------------------------
    SWITCH LOGIN / REGISTER
    --------------------------------
    */

    const switchMode = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setShowPassword(false);
        setShowConfirmPassword(false);

        navigate(
            isRegister
                ? "/login"
                : "/register"
        );
    };

    /*
    --------------------------------
    LOGIN
    --------------------------------
    */

    const handleLogin = async (event) => {
        event.preventDefault();

        // EMAIL EMPTY
        if (!email.trim()) {
            showNotification(
                "Please enter your email address.",
                "error"
            );

            return;
        }

        // EMAIL INVALID
        if (
            !emailRegex.test(
                email.trim()
            )
        ) {
            showNotification(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }

        // PASSWORD EMPTY
        if (!password) {
            showNotification(
                "Please enter your password.",
                "error"
            );

            return;
        }

        try {
            setLoading(true);

            await login(
                email
                    .trim()
                    .toLowerCase(),
                password
            );

            showNotification(
                "Login successful.",
                "success"
            );

            navigate(
                "/dashboard",
                {
                    replace: true,
                }
            );
        } catch (err) {
            console.error(
                "Login Error:",
                err
            );

            const message =
                err.response?.data?.message ||
                "Invalid email or password.";

            showNotification(
                message,
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    /*
    --------------------------------
    REGISTER
    --------------------------------
    */

    const handleRegister = async (event) => {
        event.preventDefault();

        /*
        NAME
        */

        if (!name.trim()) {
            showNotification(
                "Please enter your full name.",
                "error"
            );

            return;
        }

        /*
        EMAIL
        */

        if (!email.trim()) {
            showNotification(
                "Please enter your email address.",
                "error"
            );

            return;
        }

        if (
            !emailRegex.test(
                email.trim()
            )
        ) {
            showNotification(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }

        /*
        PASSWORD
        */

        if (!passwordValid) {
            showNotification(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
                "error"
            );

            return;
        }

        /*
        CONFIRM PASSWORD
        */

        if (
            password !==
            confirmPassword
        ) {
            showNotification(
                "Passwords do not match.",
                "error"
            );

            return;
        }

        try {
            setLoading(true);

            /*
            STEP 1
            CREATE ACCOUNT
            */

            await register(
                name.trim(),

                email
                    .trim()
                    .toLowerCase(),

                password
            );

            /*
            STEP 2
            AUTOMATIC LOGIN
            */

            await login(
                email
                    .trim()
                    .toLowerCase(),

                password
            );

            /*
            SUCCESS
            */

            showNotification(
                "Account created successfully.",
                "success"
            );

            /*
            DASHBOARD
            */

            navigate(
                "/dashboard",
                {
                    replace: true,
                }
            );
        } catch (err) {
            console.error(
                "Register/Login Error:",
                err
            );

            const message =
                err.response?.data?.message ||
                "Unable to create account.";

            showNotification(
                message,
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    /*
    --------------------------------
    UI
    --------------------------------
    */

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 18,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
            }}
            className="
                mx-auto
                w-full
                max-w-[400px]
            "
        >
            {/* CARD */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-white/80
                    bg-white/95
                    p-6
                    shadow-[0_25px_70px_rgba(30,41,59,0.14)]
                    backdrop-blur-2xl
                    dark:border-slate-800
                    dark:bg-slate-900/95
                    dark:shadow-black/30
                    sm:p-7
                "
            >
                {/* BACKGROUND GLOW */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-20
                        -top-20
                        h-44
                        w-44
                        rounded-full
                        bg-indigo-100/70
                        blur-3xl
                        dark:bg-indigo-900/20
                    "
                />

                <div className="relative z-10">
                    {/* HEADER */}

                    <div className="mb-6">
                        {/* BADGE */}

                        <div
                            className="
                                mb-4
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-indigo-50
                                px-3
                                py-1.5
                                dark:bg-indigo-950/70
                            "
                        >
                            <Sparkles
                                size={13}
                                className="
                                    text-indigo-600
                                    dark:text-indigo-400
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-extrabold
                                    tracking-widest
                                    text-indigo-600
                                    dark:text-indigo-400
                                "
                            >
                                {isRegister
                                    ? "CREATE ACCOUNT"
                                    : "WELCOME BACK"}
                            </span>
                        </div>

                        {/* TITLE */}

                        <h2
                            className="
                                text-[29px]
                                font-extrabold
                                tracking-tight
                                text-slate-950
                                dark:text-white
                            "
                        >
                            {isRegister
                                ? "Create your account"
                                : "Sign in to TaskFlow"}
                        </h2>

                        {/* DESCRIPTION */}

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            {isRegister
                                ? "Start organizing your work in one simple workspace."
                                : "Continue managing your tasks and stay productive."}
                        </p>
                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={
                            isRegister
                                ? handleRegister
                                : handleLogin
                        }
                        className="space-y-4"
                    >
                        {/* NAME */}

                        {isRegister && (
                            <AuthInput
                                label="Full name"
                                type="text"
                                placeholder="Your full name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                icon={
                                    <User size={18} />
                                }
                                autoComplete="name"
                            />
                        )}

                        {/* EMAIL */}

                        <AuthInput
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            icon={
                                <Mail size={18} />
                            }
                            autoComplete="email"
                        />

                        {/* PASSWORD */}

                        <PasswordInput
                            label="Password"
                            placeholder={
                                isRegister
                                    ? "Create a strong password"
                                    : "Enter your password"
                            }
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            showPassword={
                                showPassword
                            }
                            setShowPassword={
                                setShowPassword
                            }
                            autoComplete={
                                isRegister
                                    ? "new-password"
                                    : "current-password"
                            }
                        />

                        {/* PASSWORD RULES */}

                        {isRegister &&
                            password.length >
                                0 && (
                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-slate-100
                                        bg-slate-50
                                        p-4
                                        dark:border-slate-800
                                        dark:bg-slate-800/50
                                    "
                                >
                                    <p
                                        className="
                                            mb-3
                                            text-[11px]
                                            font-bold
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        Password requirements
                                    </p>

                                    <div className="space-y-2">
                                        <PasswordRule
                                            valid={
                                                passwordRules.length
                                            }
                                            text="At least 8 characters"
                                        />

                                        <PasswordRule
                                            valid={
                                                passwordRules.uppercase
                                            }
                                            text="One uppercase letter"
                                        />

                                        <PasswordRule
                                            valid={
                                                passwordRules.lowercase
                                            }
                                            text="One lowercase letter"
                                        />

                                        <PasswordRule
                                            valid={
                                                passwordRules.number
                                            }
                                            text="One number"
                                        />

                                        <PasswordRule
                                            valid={
                                                passwordRules.special
                                            }
                                            text="One special character"
                                        />
                                    </div>
                                </div>
                            )}

                        {/* CONFIRM PASSWORD */}

                        {isRegister && (
                            <PasswordInput
                                label="Confirm password"
                                placeholder="Enter password again"
                                value={
                                    confirmPassword
                                }
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                showPassword={
                                    showConfirmPassword
                                }
                                setShowPassword={
                                    setShowConfirmPassword
                                }
                                autoComplete="new-password"
                            />
                        )}

                        {/* LOGIN OPTIONS */}

                        {!isRegister && (
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                "
                            >
                                <label
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <input
                                        type="checkbox"
                                        className="
                                            h-4
                                            w-4
                                            accent-indigo-600
                                        "
                                    />

                                    <span
                                        className="
                                            text-xs
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        Remember me
                                    </span>
                                </label>

                                <button
                                    type="button"
                                    onClick={() =>
                                        showNotification(
                                            "Password reset is not connected yet.",
                                            "info"
                                        )
                                    }
                                    className="
                                        text-xs
                                        font-bold
                                        text-indigo-600
                                        dark:text-indigo-400
                                    "
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* SUBMIT */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                mt-2
                                flex
                                h-[54px]
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-[15px]
                                bg-gradient-to-r
                                from-violet-500
                                via-indigo-600
                                to-blue-600
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-indigo-200
                                transition
                                hover:-translate-y-0.5
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                                dark:shadow-indigo-950
                            "
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="
                                            h-5
                                            w-5
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
                                        "
                                    />

                                    {isRegister
                                        ? "Creating account..."
                                        : "Signing in..."}
                                </>
                            ) : (
                                <>
                                    {isRegister
                                        ? "Create account"
                                        : "Sign in"}

                                    <ArrowRight
                                        size={18}
                                    />
                                </>
                            )}
                        </button>
                    </form>

                    {/* SECURITY */}

                    <div
                        className="
                            my-6
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <div
                            className="
                                h-px
                                flex-1
                                bg-slate-200
                                dark:bg-slate-800
                            "
                        />

                        <span
                            className="
                                whitespace-nowrap
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-slate-400
                            "
                        >
                            Secure access
                        </span>

                        <div
                            className="
                                h-px
                                flex-1
                                bg-slate-200
                                dark:bg-slate-800
                            "
                        />
                    </div>

                    {/* SECURITY CARDS */}

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                        "
                    >
                        <SecurityItem
                            icon={
                                <ShieldCheck
                                    size={16}
                                />
                            }
                            text="Protected account"
                        />

                        <SecurityItem
                            icon={
                                <LockKeyhole
                                    size={16}
                                />
                            }
                            text="Secure password"
                        />
                    </div>

                    {/* SWITCH */}

                    <div
                        className="
                            mt-6
                            text-center
                        "
                    >
                        <span
                            className="
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                            "
                        >
                            {isRegister
                                ? "Already have an account? "
                                : "Don't have an account? "}
                        </span>

                        <button
                            type="button"
                            onClick={
                                switchMode
                            }
                            className="
                                text-sm
                                font-extrabold
                                text-indigo-600
                                dark:text-indigo-400
                            "
                        >
                            {isRegister
                                ? "Sign in"
                                : "Create account"}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/*
================================
AUTH INPUT
================================
*/

const AuthInput = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    icon,
    autoComplete,
}) => {
    const validEmail =
        type === "email" &&
        value.length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
            value
        );

    return (
        <div>
            <label
                className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    text-slate-700
                    dark:text-slate-300
                "
            >
                {label}
            </label>

            <div className="relative">
                <div
                    className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-slate-400
                    "
                >
                    {icon}
                </div>

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`
                        h-[54px]
                        w-full
                        rounded-[15px]
                        border
                        bg-slate-50
                        pl-12
                        pr-11
                        text-sm
                        text-slate-900
                        placeholder:text-slate-400
                        outline-none
                        transition
                        border-slate-200
                        hover:border-slate-300
                        focus:border-indigo-400
                        focus:bg-white
                        focus:text-slate-900
                        focus:ring-4
                        focus:ring-indigo-500/10
                        dark:border-slate-700
                        dark:bg-slate-800
                        dark:text-white
                        dark:placeholder:text-slate-500
                        dark:hover:border-slate-600
                        dark:focus:border-indigo-400
                        dark:focus:bg-slate-800
                        dark:focus:text-white
                        dark:focus:ring-indigo-500/10
                        ${
                            validEmail
                                ? "border-emerald-300 dark:border-emerald-500"
                                : ""
                        }
                    `}
                />

                {validEmail && (
                    <Check
                        size={17}
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-emerald-500
                        "
                    />
                )}
            </div>
        </div>
    );
};

/*
================================
PASSWORD INPUT
================================
*/

const PasswordInput = ({
    label,
    placeholder,
    value,
    onChange,
    showPassword,
    setShowPassword,
    autoComplete,
}) => {
    return (
        <div>
            <label
                className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    text-slate-700
                    dark:text-slate-300
                "
            >
                {label}
            </label>

            <div className="relative">
                <div
                    className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-slate-400
                    "
                >
                    <LockKeyhole
                        size={18}
                    />
                </div>

                <input
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="
                        h-[54px]
                        w-full
                        rounded-[15px]
                        border
                        border-slate-200
                        bg-slate-50
                        pl-12
                        pr-12
                        text-sm
                        text-slate-900
                        placeholder:text-slate-400
                        outline-none
                        transition
                        hover:border-slate-300
                        focus:border-indigo-400
                        focus:bg-white
                        focus:text-slate-900
                        focus:ring-4
                        focus:ring-indigo-500/10
                        dark:border-slate-700
                        dark:bg-slate-800
                        dark:text-white
                        dark:placeholder:text-slate-500
                        dark:hover:border-slate-600
                        dark:focus:border-indigo-400
                        dark:focus:bg-slate-800
                        dark:focus:text-white
                        dark:focus:ring-indigo-500/10
                    "
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(
                            (value) =>
                                !value
                        )
                    }
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        transition
                        hover:text-slate-600
                        dark:hover:text-slate-200
                    "
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    {showPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            </div>
        </div>
    );
};

/*
================================
PASSWORD RULE
================================
*/

const PasswordRule = ({
    valid,
    text,
}) => {
    return (
        <div
            className="
                flex
                items-center
                gap-2
            "
        >
            <span
                className={`
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                    rounded-full
                    ${
                        valid
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-200 text-transparent dark:bg-slate-700"
                    }
                `}
            >
                <Check size={10} />
            </span>

            <span
                className={`
                    text-[10px]
                    ${
                        valid
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-slate-400 dark:text-slate-500"
                    }
                `}
            >
                {text}
            </span>
        </div>
    );
};

/*
================================
SECURITY ITEM
================================
*/

const SecurityItem = ({
    icon,
    text,
}) => {
    return (
        <div
            className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-100
                bg-slate-50
                px-3
                py-3
                dark:border-slate-800
                dark:bg-slate-800/50
            "
        >
            <div className="text-indigo-500">
                {icon}
            </div>

            <span
                className="
                    text-[10px]
                    font-semibold
                    text-slate-500
                    dark:text-slate-400
                "
            >
                {text}
            </span>
        </div>
    );
};

export default Login;