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
            aria-label="Toggle theme"
            className="
                fixed top-3 right-10 z-[9999]
                flex h-10 w-15 items-center justify-center
                rounded-full
                border border-slate-200
                bg-white/90
                text-slate-700
                shadow-lg
                backdrop-blur
                transition-all duration-300
                hover:scale-105
                hover:shadow-xl
                dark:border-slate-700
                dark:bg-slate-900/90
                dark:text-yellow-300
            "
        >
            {dark ? (
                <Sun size={20} strokeWidth={2.2} />
            ) : (
                <Moon size={20} strokeWidth={2.2} />
            )}
        </button>
    );
};

export default ThemeToggle;