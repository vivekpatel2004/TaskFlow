import {
    Code2,
    Rocket,
    Sparkles,
    Users,
} from "lucide-react";

import { SectionHeading } from "./HomeUI";


const UseCasesSection = () => {
    return (
        <section
            className="
                px-5
                py-28
                sm:px-8
            "
        >
            <div className="mx-auto max-w-6xl">

                <SectionHeading
                    eyebrow="BUILT FOR REAL WORK"
                    title="One workspace. Different ways to use it."
                    description="The same simple workflow works whether you're building software, studying, freelancing or managing responsibilities."
                />


                <div
                    className="
                        mt-16
                        grid
                        gap-5
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >

                    <UseCase
                        icon={<Code2 />}
                        title="Developers"
                        text="Track features, bugs, backend work, UI improvements and deployment tasks."
                    />

                    <UseCase
                        icon={<Rocket />}
                        title="Students"
                        text="Organize assignments, projects, learning goals and deadlines."
                    />

                    <UseCase
                        icon={<Users />}
                        title="Teams"
                        text="Keep responsibilities visible and make progress easier to follow."
                    />

                    <UseCase
                        icon={<Sparkles />}
                        title="Freelancers"
                        text="Manage client work, deliverables and personal priorities in one place."
                    />

                </div>

            </div>
        </section>
    );
};


const UseCase = ({
    icon,
    title,
    text,
}) => (
    <div
        className="
            rounded-[26px]
            border
            border-slate-200
            bg-white/70
            p-6
            transition
            hover:-translate-y-1
            hover:shadow-xl
            dark:border-slate-800
            dark:bg-slate-900/60
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
                bg-slate-100
                text-slate-700
                dark:bg-slate-800
                dark:text-slate-200
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


export default UseCasesSection;