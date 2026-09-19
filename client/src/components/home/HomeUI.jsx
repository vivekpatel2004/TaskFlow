import { Check } from "lucide-react";


export const SectionHeading = ({
    eyebrow,
    title,
    description,
}) => {
    return (
        <div className="mx-auto max-w-3xl text-center">

            <p
                className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-indigo-600
                    dark:text-indigo-400
                "
            >
                {eyebrow}
            </p>

            <h2
                className="
                    mt-4
                    text-3xl
                    font-black
                    tracking-tight
                    sm:text-5xl
                "
            >
                {title}
            </h2>

            <p
                className="
                    mt-5
                    text-base
                    leading-7
                    text-slate-500
                    dark:text-slate-400
                "
            >
                {description}
            </p>

        </div>
    );
};


export const FeatureCard = ({
    icon,
    title,
    text,
}) => {
    return (
        <div
            className="
                rounded-[26px]
                border
                border-slate-200
                bg-white/80
                p-6
                shadow-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                dark:border-slate-800
                dark:bg-slate-900/70
            "
        >
            <div
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-indigo-500/10
                    text-indigo-600
                    dark:bg-indigo-500/15
                    dark:text-indigo-400
                "
            >
                {icon}
            </div>

            <h3
                className="
                    mt-5
                    text-lg
                    font-black
                "
            >
                {title}
            </h3>

            <p
                className="
                    mt-3
                    text-sm
                    leading-7
                    text-slate-500
                    dark:text-slate-400
                "
            >
                {text}
            </p>
        </div>
    );
};


export const MiniStat = ({
    number,
    label,
}) => {
    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white/70
                px-4
                py-4
                dark:border-slate-800
                dark:bg-slate-900/60
            "
        >
            <p
                className="
                    text-lg
                    font-black
                    text-indigo-600
                    dark:text-indigo-400
                "
            >
                {number}
            </p>

            <p
                className="
                    mt-1
                    text-[11px]
                    font-semibold
                    text-slate-400
                "
            >
                {label}
            </p>
        </div>
    );
};


export const CheckItem = ({
    children,
}) => {
    return (
        <div
            className="
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-slate-500
                dark:text-slate-400
            "
        >
            <Check
                size={15}
                className="text-emerald-500"
            />

            {children}
        </div>
    );
};


export const RoadmapItem = ({
    text,
}) => {
    return (
        <div
            className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
                dark:border-slate-800
                dark:bg-slate-900
            "
        >
            <div
                className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-500/10
                    text-indigo-500
                "
            >
                <Check size={15} />
            </div>

            <span className="text-sm font-bold">
                {text}
            </span>
        </div>
    );
};