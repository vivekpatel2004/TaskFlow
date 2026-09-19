import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    LogIn,
    LogOut,
    User,
    UserPlus,
    LayoutDashboard,
    Home,
    Menu,
    X,
} from "lucide-react";

import ThemeToggle from "../ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ openAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        user,
        logout,
        loading,
    } = useAuth();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isAuthenticated = Boolean(user);

    const currentPath = location.pathname;

    const isDashboard = currentPath === "/dashboard";
    const isProfile = currentPath === "/profile";

    // -------------------------------------------------------
    // CLOSE MOBILE MENU
    // -------------------------------------------------------

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // -------------------------------------------------------
    // LOGOUT
    // -------------------------------------------------------

    const handleLogout = () => {
        closeMobileMenu();

        logout();

        navigate("/", {
            replace: true,
        });
    };

    // -------------------------------------------------------
    // LOGO
    // -------------------------------------------------------

    const handleLogoClick = () => {
        closeMobileMenu();

        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    };

    // -------------------------------------------------------
    // HOME
    // -------------------------------------------------------

    const handleHome = () => {
        closeMobileMenu();
        navigate("/");
    };

    // -------------------------------------------------------
    // DASHBOARD
    // -------------------------------------------------------

    const handleDashboard = () => {
        closeMobileMenu();
        navigate("/dashboard");
    };

    // -------------------------------------------------------
    // PROFILE
    // -------------------------------------------------------

    const handleProfile = () => {
        closeMobileMenu();
        navigate("/profile");
    };

    // -------------------------------------------------------
    // LOGIN
    // -------------------------------------------------------

    const handleLogin = () => {
        closeMobileMenu();

        if (openAuth) {
            openAuth("login");
        } else {
            navigate("/login");
        }
    };

    // -------------------------------------------------------
    // REGISTER
    // -------------------------------------------------------

    const handleRegister = () => {
        closeMobileMenu();

        if (openAuth) {
            openAuth("register");
        } else {
            navigate("/register");
        }
    };

    return (
        <header
            className="
                sticky top-0 z-50
                w-full
                border-b border-slate-200/70
                bg-white/90
                backdrop-blur-xl
                dark:border-slate-800/70
                dark:bg-[#070b16]/90
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    min-h-16
                    w-full
                    max-w-7xl
                    items-center
                    justify-between
                    gap-3
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >
                {/* =====================================================
                    LOGO
                ====================================================== */}

                <button
                    type="button"
                    onClick={handleLogoClick}
                    aria-label="Go to home"
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                    "
                >
                    <div
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-indigo-600
                            text-sm
                            font-bold
                            text-white
                            shadow-sm
                        "
                    >
                        T
                    </div>

                    <span
                        className="
                            text-lg
                            font-bold
                            tracking-tight
                            text-slate-900
                            dark:text-white
                        "
                    >
                        TaskFlow
                    </span>
                </button>

                {/* =====================================================
                    DESKTOP / RIGHT SIDE
                ====================================================== */}

                <div
                    className="
                        flex
                        min-w-0
                        items-center
                        gap-1.5
                        sm:gap-2
                    "
                >
                    {/* =================================================
                        THEME TOGGLE
                        Always visible
                    ================================================== */}

                    <div className="shrink-0">
                        <ThemeToggle />
                    </div>

                    {/* =================================================
                        AUTH LOADING
                    ================================================== */}

                    {loading ? (
                        <div
                            className="
                                h-9
                                w-9
                                animate-pulse
                                rounded-lg
                                bg-slate-200
                                dark:bg-slate-800
                                sm:w-24
                            "
                        />
                    ) : isAuthenticated ? (
                        <>
                            {/* =================================================
                                DESKTOP NAVIGATION
                            ================================================== */}

                            <div className="hidden items-center gap-1.5 sm:flex">
                                {/* -----------------------------------------
                                    DASHBOARD PAGE
                                    Show Home + Profile + Logout
                                ------------------------------------------ */}

                                {isDashboard ? (
                                    <>
                                        {/* HOME */}

                                        <button
                                            type="button"
                                            onClick={handleHome}
                                            title="Home"
                                            className="
                                                flex
                                                h-9
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-lg
                                                px-2.5
                                                text-sm
                                                font-medium
                                                text-slate-700
                                                transition
                                                hover:bg-slate-100
                                                dark:text-slate-200
                                                dark:hover:bg-slate-800
                                                sm:px-3
                                            "
                                        >
                                            <Home size={17} />

                                            <span className="hidden sm:inline">
                                                Home
                                            </span>
                                        </button>

                                        {/* PROFILE */}

                                        <button
                                            type="button"
                                            onClick={handleProfile}
                                            title="Profile"
                                            className="
                                                flex
                                                h-9
                                                max-w-[180px]
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-lg
                                                px-2.5
                                                text-sm
                                                font-medium
                                                text-slate-700
                                                transition
                                                hover:bg-slate-100
                                                dark:text-slate-200
                                                dark:hover:bg-slate-800
                                                sm:px-3
                                            "
                                        >
                                            <User
                                                size={17}
                                                className="shrink-0"
                                            />

                                            <span
                                                className="
                                                    hidden
                                                    max-w-[120px]
                                                    truncate
                                                    sm:block
                                                "
                                            >
                                                {user?.name || "Profile"}
                                            </span>
                                        </button>

                                        {/* LOGOUT */}

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            title="Logout"
                                            aria-label="Logout"
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                text-slate-600
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-600
                                                dark:text-slate-300
                                                dark:hover:bg-red-950/30
                                                dark:hover:text-red-400
                                            "
                                        >
                                            <LogOut size={17} />
                                        </button>
                                    </>
                                ) : isProfile ? (
                                    <>
                                        {/* -------------------------------------
                                            PROFILE PAGE
                                            Show Home + Dashboard + Logout
                                        -------------------------------------- */}

                                        {/* HOME */}

                                        <button
                                            type="button"
                                            onClick={handleHome}
                                            title="Home"
                                            className="
                                                flex
                                                h-9
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-lg
                                                px-2.5
                                                text-sm
                                                font-medium
                                                text-slate-700
                                                transition
                                                hover:bg-slate-100
                                                dark:text-slate-200
                                                dark:hover:bg-slate-800
                                                sm:px-3
                                            "
                                        >
                                            <Home size={17} />

                                            <span className="hidden sm:inline">
                                                Home
                                            </span>
                                        </button>

                                        {/* DASHBOARD */}

                                        <button
                                            type="button"
                                            onClick={handleDashboard}
                                            title="Dashboard"
                                            className="
                                                flex
                                                h-9
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-lg
                                                px-2.5
                                                text-sm
                                                font-medium
                                                text-slate-700
                                                transition
                                                hover:bg-slate-100
                                                dark:text-slate-200
                                                dark:hover:bg-slate-800
                                                sm:px-3
                                            "
                                        >
                                            <LayoutDashboard size={17} />

                                            <span className="hidden sm:inline">
                                                Dashboard
                                            </span>
                                        </button>

                                        {/* LOGOUT */}

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            title="Logout"
                                            aria-label="Logout"
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                text-slate-600
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-600
                                                dark:text-slate-300
                                                dark:hover:bg-red-950/30
                                                dark:hover:text-red-400
                                            "
                                        >
                                            <LogOut size={17} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* -------------------------------------
                                            OTHER AUTHENTICATED PAGES
                                            Home + Dashboard + Profile + Logout
                                        -------------------------------------- */}

                                        {/* HOME */}

                                        <button
                                            type="button"
                                            onClick={handleHome}
                                            title="Home"
                                            className="
                                                flex
                                                h-9
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-lg
                                                px-2.5
                                                text-sm
                                                font-medium
                                                text-slate-700
                                                transition
                                                hover:bg-slate-100
                                                dark:text-slate-200
                                                dark:hover:bg-slate-800
                                                sm:px-3
                                            "
                                        >
                                            <Home size={17} />

                                            <span className="hidden sm:inline">
                                                Home
                                            </span>
                                        </button>

                                        {/* DASHBOARD */}

                                        <button
                                            type="button"
                                            onClick={handleDashboard}
                                            title="Dashboard"
                                            className="
                                                flex
                                                h-9
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-lg
                                                px-2.5
                                                text-sm
                                                font-medium
                                                text-slate-700
                                                transition
                                                hover:bg-slate-100
                                                dark:text-slate-200
                                                dark:hover:bg-slate-800
                                                sm:px-3
                                            "
                                        >
                                            <LayoutDashboard size={17} />

                                            <span className="hidden sm:inline">
                                                Dashboard
                                            </span>
                                        </button>

                                        {/* PROFILE */}

                                        <button
                                            type="button"
                                            onClick={handleProfile}
                                            title="Profile"
                                            className="
                                                flex
                                                h-9
                                                max-w-[180px]
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-lg
                                                px-2.5
                                                text-sm
                                                font-medium
                                                text-slate-700
                                                transition
                                                hover:bg-slate-100
                                                dark:text-slate-200
                                                dark:hover:bg-slate-800
                                                sm:px-3
                                            "
                                        >
                                            <User
                                                size={17}
                                                className="shrink-0"
                                            />

                                            <span
                                                className="
                                                    hidden
                                                    max-w-[120px]
                                                    truncate
                                                    sm:block
                                                "
                                            >
                                                {user?.name || "Profile"}
                                            </span>
                                        </button>

                                        {/* LOGOUT */}

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            title="Logout"
                                            aria-label="Logout"
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                text-slate-600
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-600
                                                dark:text-slate-300
                                                dark:hover:bg-red-950/30
                                                dark:hover:text-red-400
                                            "
                                        >
                                            <LogOut size={17} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* =================================================
                                MOBILE MENU BUTTON

                                Theme stays outside, so it is ALWAYS visible.
                            ================================================== */}

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileMenuOpen((prev) => !prev)
                                }
                                aria-label={
                                    mobileMenuOpen
                                        ? "Close navigation menu"
                                        : "Open navigation menu"
                                }
                                aria-expanded={mobileMenuOpen}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-slate-600
                                    transition
                                    hover:bg-slate-100
                                    dark:text-slate-300
                                    dark:hover:bg-slate-800
                                    sm:hidden
                                "
                            >
                                {mobileMenuOpen ? (
                                    <X size={19} />
                                ) : (
                                    <Menu size={19} />
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* =================================================
                                DESKTOP LOGGED OUT
                            ================================================== */}

                            <div className="hidden items-center gap-1.5 sm:flex">
                                {/* LOGIN */}

                                <button
                                    type="button"
                                    onClick={handleLogin}
                                    title="Login"
                                    className="
                                        flex
                                        h-9
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-lg
                                        px-2.5
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        transition
                                        hover:bg-slate-100
                                        dark:text-slate-200
                                        dark:hover:bg-slate-800
                                        sm:px-3
                                    "
                                >
                                    <LogIn size={17} />

                                    <span className="hidden sm:inline">
                                        Login
                                    </span>
                                </button>

                                {/* REGISTER */}

                                <button
                                    type="button"
                                    onClick={handleRegister}
                                    className="
                                        flex
                                        h-9
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-lg
                                        bg-indigo-600
                                        px-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-sm
                                        transition
                                        hover:bg-indigo-700
                                        sm:px-4
                                    "
                                >
                                    <UserPlus size={17} />

                                    <span className="hidden sm:inline">
                                        Register
                                    </span>
                                </button>
                            </div>

                            {/* =================================================
                                MOBILE LOGGED OUT MENU
                            ================================================== */}

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileMenuOpen((prev) => !prev)
                                }
                                aria-label={
                                    mobileMenuOpen
                                        ? "Close navigation menu"
                                        : "Open navigation menu"
                                }
                                aria-expanded={mobileMenuOpen}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-slate-600
                                    transition
                                    hover:bg-slate-100
                                    dark:text-slate-300
                                    dark:hover:bg-slate-800
                                    sm:hidden
                                "
                            >
                                {mobileMenuOpen ? (
                                    <X size={19} />
                                ) : (
                                    <Menu size={19} />
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* =============================================================
                MOBILE DROPDOWN MENU

                Separate row prevents overlap with ThemeToggle.
            ============================================================= */}

            {mobileMenuOpen && (
                <div
                    className="
                        border-t
                        border-slate-200/70
                        bg-white
                        px-4
                        py-3
                        shadow-lg
                        dark:border-slate-800/70
                        dark:bg-[#070b16]
                        sm:hidden
                    "
                >
                    {isAuthenticated ? (
                        <div className="flex flex-col gap-1.5">
                            {/* ---------------------------------------------
                                DASHBOARD PAGE
                                Home + Profile + Logout
                            ---------------------------------------------- */}

                            {isDashboard ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleHome}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-slate-700
                                            transition
                                            hover:bg-slate-100
                                            dark:text-slate-200
                                            dark:hover:bg-slate-800
                                        "
                                    >
                                        <Home size={18} />
                                        Home
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleProfile}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-slate-700
                                            transition
                                            hover:bg-slate-100
                                            dark:text-slate-200
                                            dark:hover:bg-slate-800
                                        "
                                    >
                                        <User size={18} />
                                        {user?.name || "Profile"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-red-600
                                            transition
                                            hover:bg-red-50
                                            dark:text-red-400
                                            dark:hover:bg-red-950/30
                                        "
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </>
                            ) : isProfile ? (
                                <>
                                    {/* HOME */}

                                    <button
                                        type="button"
                                        onClick={handleHome}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-slate-700
                                            transition
                                            hover:bg-slate-100
                                            dark:text-slate-200
                                            dark:hover:bg-slate-800
                                        "
                                    >
                                        <Home size={18} />
                                        Home
                                    </button>

                                    {/* DASHBOARD */}

                                    <button
                                        type="button"
                                        onClick={handleDashboard}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-slate-700
                                            transition
                                            hover:bg-slate-100
                                            dark:text-slate-200
                                            dark:hover:bg-slate-800
                                        "
                                    >
                                        <LayoutDashboard size={18} />
                                        Dashboard
                                    </button>

                                    {/* LOGOUT */}

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-red-600
                                            transition
                                            hover:bg-red-50
                                            dark:text-red-400
                                            dark:hover:bg-red-950/30
                                        "
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* HOME */}

                                    <button
                                        type="button"
                                        onClick={handleHome}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-slate-700
                                            transition
                                            hover:bg-slate-100
                                            dark:text-slate-200
                                            dark:hover:bg-slate-800
                                        "
                                    >
                                        <Home size={18} />
                                        Home
                                    </button>

                                    {/* DASHBOARD */}

                                    <button
                                        type="button"
                                        onClick={handleDashboard}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-slate-700
                                            transition
                                            hover:bg-slate-100
                                            dark:text-slate-200
                                            dark:hover:bg-slate-800
                                        "
                                    >
                                        <LayoutDashboard size={18} />
                                        Dashboard
                                    </button>

                                    {/* PROFILE */}

                                    <button
                                        type="button"
                                        onClick={handleProfile}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-slate-700
                                            transition
                                            hover:bg-slate-100
                                            dark:text-slate-200
                                            dark:hover:bg-slate-800
                                        "
                                    >
                                        <User size={18} />
                                        {user?.name || "Profile"}
                                    </button>

                                    {/* LOGOUT */}

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            gap-3
                                            rounded-xl
                                            px-4
                                            py-3
                                            text-left
                                            text-sm
                                            font-medium
                                            text-red-600
                                            transition
                                            hover:bg-red-50
                                            dark:text-red-400
                                            dark:hover:bg-red-950/30
                                        "
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {/* LOGIN */}

                            <button
                                type="button"
                                onClick={handleLogin}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-left
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    transition
                                    hover:bg-slate-100
                                    dark:text-slate-200
                                    dark:hover:bg-slate-800
                                "
                            >
                                <LogIn size={18} />
                                Login
                            </button>

                            {/* REGISTER */}

                            <button
                                type="button"
                                onClick={handleRegister}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    bg-indigo-600
                                    px-4
                                    py-3
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-indigo-700
                                "
                            >
                                <UserPlus size={18} />
                                Register
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;