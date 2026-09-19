import { useNavigate } from "react-router-dom";

import {
    LogIn,
    LogOut,
    User,
    UserPlus,
} from "lucide-react";

import ThemeToggle from "../ThemeToggle";

import { useAuth } from "../../context/AuthContext";

const Navbar = ({
    openAuth,
}) => {
    const navigate = useNavigate();

    const {
        user,
        logout,
        loading,
    } = useAuth();

    const isAuthenticated =
        Boolean(user);

    // --------------------------------------------------
    // LOGOUT
    // --------------------------------------------------

    const handleLogout = () => {
        logout();

        navigate("/", {
            replace: true,
        });
    };

    // --------------------------------------------------
    // LOGO CLICK
    // --------------------------------------------------

    const handleLogoClick = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    };

    // --------------------------------------------------
    // LOGIN
    // --------------------------------------------------

    const handleLogin = () => {
        if (openAuth) {
            openAuth("login");
        } else {
            navigate("/login");
        }
    };

    // --------------------------------------------------
    // REGISTER
    // --------------------------------------------------

    const handleRegister = () => {
        if (openAuth) {
            openAuth("register");
        } else {
            navigate("/register");
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800/70 dark:bg-[#070b16]/90">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* LOGO */}
                <button
                    type="button"
                    onClick={
                        handleLogoClick
                    }
                    className="flex items-center gap-2"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
                        T
                    </div>

                    <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                        TaskFlow
                    </span>
                </button>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-2 sm:gap-3">

                    {/* THEME */}
                    <ThemeToggle />

                    {/* AUTH LOADING */}
                    {loading ? (
                        <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                    ) : isAuthenticated ? (
                        <>
                            {/* DASHBOARD */}
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/dashboard"
                                    )
                                }
                                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:block"
                            >
                                Dashboard
                            </button>

                            {/* PROFILE */}
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/profile"
                                    )
                                }
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <User
                                    size={16}
                                />

                                <span className="hidden max-w-[120px] truncate sm:block">
                                    {user?.name ||
                                        "Profile"}
                                </span>
                            </button>

                            {/* LOGOUT */}
                            <button
                                type="button"
                                onClick={
                                    handleLogout
                                }
                                title="Logout"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                            >
                                <LogOut
                                    size={17}
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            {/* LOGIN */}
                            <button
                                type="button"
                                onClick={
                                    handleLogin
                                }
                                className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 sm:flex"
                            >
                                <LogIn
                                    size={16}
                                />

                                Login
                            </button>

                            {/* REGISTER */}
                            <button
                                type="button"
                                onClick={
                                    handleRegister
                                }
                                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                            >
                                <UserPlus
                                    size={16}
                                />

                                <span className="hidden sm:inline">
                                    Register
                                </span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;