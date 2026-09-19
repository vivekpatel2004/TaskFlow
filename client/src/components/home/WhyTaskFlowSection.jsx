import {
    ArrowRight,
    BarChart3,
    Rocket,
    Sparkles,
    Target,
} from "lucide-react";


const WhyTaskFlowSection = ({
    openAuth,
}) => {
    return (
        <section
            id="why"
            className="
                scroll-mt-24
                bg-slate-950
                px-5
                py-28
                text-white
                sm:px-8
            "
        >
            <div className="mx-auto max-w-6xl">

                <div
                    className="
                        grid
                        items-center
                        gap-14
                        lg:grid-cols-2
                    "
                >

                    <div>
                        <p
                            className="
                                text-xs
                                font-black
                                uppercase
                                tracking-[0.2em]
                                text-indigo-400
                            "
                        >
                            WHY TASKFLOW
                        </p>

                        <h2
                            className="
                                mt-5
                                text-4xl
                                font-black
                                leading-tight
                                tracking-tight
                                sm:text-5xl
                            "
                        >
                            Productivity isn't about
                            doing everything.

                            <br />

                            <span className="text-indigo-400">
                                It's about knowing what matters.
                            </span>
                        </h2>

                        <p
                            className="
                                mt-6
                                max-w-xl
                                text-base
                                leading-8
                                text-slate-400
                            "
                        >
                            A long task list can make work
                            feel harder than it really is.
                            TaskFlow gives you a clear place
                            to organize responsibilities,
                            understand priorities and see
                            progress.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                openAuth("register")
                            }
                            className="
                                mt-8
                                inline-flex
                                items-center
                                gap-2
                                rounded-2xl
                                bg-white
                                px-6
                                py-3.5
                                text-sm
                                font-black
                                text-slate-950
                            "
                        >
                            Build your workspace
                            <ArrowRight size={17} />
                        </button>
                    </div>


                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-2
                        "
                    >
                        <Benefit
                            icon={<Target />}
                            title="Focus"
                            text="Know what needs attention instead of staring at an endless list."
                        />

                        <Benefit
                            icon={<BarChart3 />}
                            title="Visibility"
                            text="Understand where your work stands at a glance."
                        />

                        <Benefit
                            icon={<Rocket />}
                            title="Momentum"
                            text="Turn completed tasks into visible progress throughout the day."
                        />

                        <Benefit
                            icon={<Sparkles />}
                            title="Clarity"
                            text="Keep work organized without filling your workspace with unnecessary complexity."
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};


const Benefit = ({
    icon,
    title,
    text,
}) => (
    <div
        className="
            rounded-[24px]
            border
            border-white/10
            bg-white/[0.04]
            p-6
        "
    >
        <div
            className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-indigo-500/15
                text-indigo-400
            "
        >
            {icon}
        </div>

        <h3 className="mt-5 font-black">
            {title}
        </h3>

        <p
            className="
                mt-2
                text-sm
                leading-6
                text-slate-400
            "
        >
            {text}
        </p>
    </div>
);


export default WhyTaskFlowSection;