const ProductPreview = () => {
    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-5
                pb-28
                sm:px-8
            "
        >
            <div
                className="
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-slate-200
                    bg-white/80
                    p-4
                    shadow-[0_30px_100px_rgba(15,23,42,0.10)]
                    backdrop-blur-xl
                    sm:p-6
                    dark:border-slate-800
                    dark:bg-slate-900/70
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        pb-4
                        dark:border-slate-800
                    "
                >
                    <div className="flex gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>

                    <div
                        className="
                            hidden
                            rounded-full
                            bg-slate-100
                            px-5
                            py-1.5
                            text-[10px]
                            font-bold
                            text-slate-400
                            sm:block
                            dark:bg-slate-800
                        "
                    >
                        taskflow.app/dashboard
                    </div>

                    <div className="w-10" />
                </div>


                <div
                    className="
                        grid
                        gap-5
                        pt-5
                        lg:grid-cols-[190px_1fr]
                    "
                >

                    <div
                        className="
                            hidden
                            rounded-2xl
                            bg-slate-50
                            p-4
                            lg:block
                            dark:bg-slate-950
                        "
                    >
                        <div
                            className="
                                mb-7
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <div
                                className="
                                    h-7
                                    w-7
                                    rounded-lg
                                    bg-indigo-600
                                "
                            />

                            <span className="text-xs font-black">
                                TaskFlow
                            </span>
                        </div>

                        <PreviewNav
                            text="Dashboard"
                            active
                        />

                        <PreviewNav text="My Tasks" />

                        <PreviewNav text="Profile" />
                    </div>


                    <div>
                        <p
                            className="
                                text-xs
                                font-semibold
                                text-indigo-500
                            "
                        >
                            YOUR WORKSPACE
                        </p>

                        <h3
                            className="
                                mt-1
                                text-2xl
                                font-black
                            "
                        >
                            Good afternoon 👋
                        </h3>


                        <div
                            className="
                                mt-5
                                grid
                                grid-cols-2
                                gap-3
                                sm:grid-cols-4
                            "
                        >
                            <PreviewStat
                                number="12"
                                label="Total tasks"
                            />

                            <PreviewStat
                                number="05"
                                label="In progress"
                            />

                            <PreviewStat
                                number="04"
                                label="Completed"
                            />

                            <PreviewStat
                                number="03"
                                label="Due soon"
                            />
                        </div>


                        <div
                            className="
                                mt-4
                                grid
                                gap-4
                                md:grid-cols-2
                            "
                        >
                            <PreviewTask
                                title="Build authentication"
                                status="In Progress"
                                priority="High"
                            />

                            <PreviewTask
                                title="Finish dashboard UI"
                                status="Completed"
                                priority="Medium"
                            />

                            <PreviewTask
                                title="Connect MySQL database"
                                status="Pending"
                                priority="High"
                            />

                            <PreviewTask
                                title="Prepare project README"
                                status="Pending"
                                priority="Low"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};


const PreviewNav = ({
    text,
    active = false,
}) => (
    <div
        className={`
            rounded-xl
            px-3
            py-2.5
            text-[10px]
            font-bold
            ${
                active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400"
            }
        `}
    >
        {text}
    </div>
);


const PreviewStat = ({
    number,
    label,
}) => (
    <div
        className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            dark:border-slate-800
            dark:bg-slate-900
        "
    >
        <p className="text-xl font-black">
            {number}
        </p>

        <p
            className="
                mt-1
                text-[10px]
                font-semibold
                text-slate-400
            "
        >
            {label}
        </p>
    </div>
);


const PreviewTask = ({
    title,
    status,
    priority,
}) => {
    const statusClass =
        status === "Completed"
            ? "bg-emerald-500/10 text-emerald-600"
            : status === "In Progress"
            ? "bg-indigo-500/10 text-indigo-600"
            : "bg-amber-500/10 text-amber-600";

    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                dark:border-slate-800
                dark:bg-slate-900
            "
        >
            <div className="flex justify-between gap-3">

                <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                        {title}
                    </p>

                    <p
                        className="
                            mt-2
                            text-[10px]
                            text-slate-400
                        "
                    >
                        Priority: {priority}
                    </p>
                </div>

                <span
                    className={`
                        h-fit
                        shrink-0
                        rounded-full
                        px-2.5
                        py-1
                        text-[9px]
                        font-bold
                        ${statusClass}
                    `}
                >
                    {status}
                </span>

            </div>
        </div>
    );
};


export default ProductPreview;