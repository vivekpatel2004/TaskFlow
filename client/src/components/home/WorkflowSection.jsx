import {
    CheckCircle2,
    MousePointer2,
    Target,
} from "lucide-react";

import { SectionHeading } from "./HomeUI";


const WorkflowSection = () => {
    return (
        <section
            id="workflow"
            className="
                scroll-mt-24
                px-5
                py-28
                sm:px-8
            "
        >
            <div className="mx-auto max-w-6xl">

                <SectionHeading
                    eyebrow="WORKFLOW"
                    title="From thought to done in three simple steps."
                    description="TaskFlow keeps the process simple: capture the work, decide what matters, then move it to completion."
                />


                <div
                    className="
                        mt-16
                        grid
                        gap-5
                        md:grid-cols-3
                    "
                >

                    <WorkflowCard
                        number="01"
                        icon={<MousePointer2 />}
                        title="Capture"
                        text="Turn an idea, requirement or responsibility into a clear task."
                    />

                    <WorkflowCard
                        number="02"
                        icon={<Target />}
                        title="Prioritize"
                        text="Set priority, status and due date so you know what deserves attention."
                    />

                    <WorkflowCard
                        number="03"
                        icon={<CheckCircle2 />}
                        title="Complete"
                        text="Move the task forward, finish it and use your dashboard to see progress."
                    />

                </div>

            </div>
        </section>
    );
};


const WorkflowCard = ({
    number,
    icon,
    title,
    text,
}) => (
    <div
        className="
            rounded-[28px]
            border
            border-slate-200
            bg-white
            p-7
            shadow-sm
            transition
            hover:-translate-y-1
            hover:shadow-xl
            dark:border-slate-800
            dark:bg-slate-900
        "
    >
        <div
            className="
                flex
                items-center
                justify-between
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
                    dark:text-indigo-400
                "
            >
                {icon}
            </div>

            <span
                className="
                    text-xs
                    font-black
                    tracking-widest
                    text-slate-300
                    dark:text-slate-700
                "
            >
                {number}
            </span>
        </div>

        <h3
            className="
                mt-7
                text-xl
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


export default WorkflowSection;