import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const [dark, setDark] = useState(() => {
        return (
            localStorage.getItem("taskflow-theme") ===
            "dark"
        );
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add(
                "dark"
            );

            localStorage.setItem(
                "taskflow-theme",
                "dark"
            );
        } else {
            document.documentElement.classList.remove(
                "dark"
            );

            localStorage.setItem(
                "taskflow-theme",
                "light"
            );
        }
    }, [dark]);

    return (
        <button
            type="button"
            onClick={() =>
                setDark((prev) => !prev)
            }
            aria-label="Toggle theme"
            className="
                fixed
                top-4
                right-4
                sm:right-6
                md:right-8
                lg:right-10

                z-[100]

                flex
                h-10
                w-10
                sm:h-11
                sm:w-11
                md:h-12
                md:w-12

                items-center
                justify-center

                rounded-full

                border
                border-slate-200
                bg-white/90
                text-slate-700

                shadow-lg
                backdrop-blur-md

                transition-all
                duration-300

                hover:scale-105
                hover:shadow-xl

                dark:border-slate-700
                dark:bg-slate-900/90
                dark:text-yellow-300
            "
        >
            {dark ? (
                <Sun
                    size={19}
                    strokeWidth={2.2}
                    className="sm:size-[20px]"
                />
            ) : (
                <Moon
                    size={19}
                    strokeWidth={2.2}
                    className="sm:size-[20px]"
                />
            )}
        </button>
    );
};

export default ThemeToggle;