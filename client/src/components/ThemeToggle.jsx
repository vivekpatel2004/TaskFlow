import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("taskflow-theme") === "dark";
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("taskflow-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("taskflow-theme", "light");
        }
    }, [dark]);

    return (
        <button
            type="button"
            onClick={() => setDark((prev) => !prev)}
            aria-label={
                dark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            title={
                dark
                    ? "Light mode"
                    : "Dark mode"
            }
            className="
                relative
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                text-slate-700
                shadow-sm
                transition-all
                duration-200
                hover:scale-105
                hover:shadow-md
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-yellow-300
                sm:h-10
                sm:w-10
            "
        >
            {dark ? (
                <Sun
                    size={18}
                    strokeWidth={2.2}
                />
            ) : (
                <Moon
                    size={18}
                    strokeWidth={2.2}
                />
            )}
        </button>
    );
};

export default ThemeToggle;