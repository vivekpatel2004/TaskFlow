import { useEffect } from "react";

import {
    ArrowRight,
    Check,
    Sparkles,
    X,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import Login from "../../pages/Login";

import {
    CheckItem,
    MiniStat,
} from "./HomeUI";

const HeroSection = ({
    isAuthPage,
    isRegister,
    isAuthenticated,
    authLoading,
    openAuth,
    closeAuth,
    scrollToSection,
}) => {
    const navigate = useNavigate();

    // --------------------------------------------------
    // IF USER IS ALREADY LOGGED IN
    // NEVER SHOW LOGIN / REGISTER PAGE
    // --------------------------------------------------

    useEffect(() => {
        if (
            !authLoading &&
            isAuthenticated &&
            isAuthPage
        ) {
            navigate("/dashboard", {
                replace: true,
            });
        }
    }, [
        authLoading,
        isAuthenticated,
        isAuthPage,
        navigate,
    ]);

    // --------------------------------------------------
    // START TASKFLOW
    // --------------------------------------------------

    const handleStartTaskFlow = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
            return;
        }

        openAuth("register");
    };

    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-5
                pb-24
                pt-16
                sm:px-8
                sm:pt-20
                lg:pb-28
            "
        >
            <div
                className={`
                    grid
                    items-center
                    gap-12
                    ${
                        isAuthPage &&
                        !isAuthenticated
                            ? "lg:grid-cols-[1fr_400px] lg:gap-20"
                            : "lg:grid-cols-[1fr]"
                    }
                `}
            >
                {/* ---------------------------------- */}
                {/* HERO CONTENT */}
                {/* ---------------------------------- */}

                <div
                    className="
                        max-w-3xl
                    "
                >
                    {/* BADGE */}
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-indigo-200
                            bg-white/80
                            px-4
                            py-2
                            shadow-sm
                            dark:border-indigo-900
                            dark:bg-slate-900/70
                        "
                    >
                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-emerald-500
                            "
                        />

                        <Sparkles
                            size={14}
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
                            Your productivity workspace
                        </span>
                    </div>

                    {/* HEADING */}
                    <h1
                        className="
                            mt-7
                            text-5xl
                            font-black
                            leading-[0.98]
                            tracking-[-0.06em]
                            text-slate-950
                            sm:text-6xl
                            lg:text-7xl
                            xl:text-[80px]
                            dark:text-white
                        "
                    >
                        Turn busy work
                        <br />

                        into{" "}

                        <span
                            className="
                                bg-gradient-to-r
                                from-violet-500
                                via-indigo-600
                                to-blue-600
                                bg-clip-text
                                text-transparent
                            "
                        >
                            clear progress.
                        </span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p
                        className="
                            mt-7
                            max-w-2xl
                            text-base
                            leading-8
                            text-slate-500
                            sm:text-lg
                            dark:text-slate-400
                        "
                    >
                        TaskFlow gives you one focused
                        workspace to capture tasks,
                        set priorities, track progress,
                        and finish important work
                        without unnecessary complexity.
                    </p>

                    {/* BUTTONS */}
                    <div
                        className="
                            mt-8
                            flex
                            flex-wrap
                            gap-3
                        "
                    >
                        {/* START ORGANIZING */}
                        <button
                            type="button"
                            onClick={
                                handleStartTaskFlow
                            }
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-2xl
                                bg-indigo-600
                                px-6
                                py-3.5
                                text-sm
                                font-black
                                text-white
                                shadow-xl
                                shadow-indigo-500/20
                                transition
                                hover:-translate-y-1
                                hover:bg-indigo-700
                            "
                        >
                            {isAuthenticated
                                ? "Open Dashboard"
                                : "Start organizing"}

                            <ArrowRight
                                size={17}
                            />
                        </button>

                        {/* WORKFLOW */}
                        <button
                            type="button"
                            onClick={() =>
                                scrollToSection(
                                    "workflow"
                                )
                            }
                            className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white/80
                                px-6
                                py-3.5
                                text-sm
                                font-bold
                                text-slate-700
                                transition
                                hover:-translate-y-1
                                dark:border-slate-700
                                dark:bg-slate-900
                                dark:text-slate-200
                            "
                        >
                            See how it works
                        </button>
                    </div>

                    {/* CHECK ITEMS */}
                    <div
                        className="
                            mt-8
                            flex
                            flex-wrap
                            gap-x-6
                            gap-y-3
                        "
                    >
                        <CheckItem>
                            Simple task management
                        </CheckItem>

                        <CheckItem>
                            Priority-based planning
                        </CheckItem>

                        <CheckItem>
                            Protected workspace
                        </CheckItem>
                    </div>

                    {/* STATS */}
                    <div
                        className="
                            mt-12
                            grid
                            max-w-2xl
                            grid-cols-2
                            gap-3
                            sm:grid-cols-4
                        "
                    >
                        <MiniStat
                            number="01"
                            label="Workspace"
                        />

                        <MiniStat
                            number="03"
                            label="Task states"
                        />

                        <MiniStat
                            number="24/7"
                            label="Access"
                        />

                        <MiniStat
                            number="100%"
                            label="Focused"
                        />
                    </div>
                </div>

                {/* ---------------------------------- */}
                {/* LOGIN / REGISTER */}
                {/* ---------------------------------- */}

                {!authLoading &&
                    isAuthPage &&
                    !isAuthenticated && (
                        <div
                            id="auth"
                            className="
                                relative
                                flex
                                w-full
                                justify-center
                                lg:justify-end
                            "
                        >
                            {/* CLOSE BUTTON */}
                            <button
                                type="button"
                                onClick={
                                    closeAuth
                                }
                                className="
                                    absolute
                                    -right-2
                                    -top-2
                                    z-20
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-slate-200
                                    bg-white
                                    text-slate-500
                                    shadow-lg
                                    transition
                                    hover:scale-105
                                    dark:border-slate-700
                                    dark:bg-slate-900
                                    dark:text-slate-300
                                "
                                aria-label="Close authentication"
                            >
                                <X size={16} />
                            </button>

                            {/* AUTH CARD */}
                            <div className="w-full max-w-[400px]">
                                <Login
                                    mode={
                                        isRegister
                                            ? "register"
                                            : "login"
                                    }
                                />
                            </div>
                        </div>
                    )}
            </div>
        </section>
    );
};

export default HeroSection;