import {
    BarChart3,
    Clock3,
    Layers3,
    ShieldCheck,
    Target,
    Zap,
} from "lucide-react";

import {
    FeatureCard,
    SectionHeading,
} from "./HomeUI";


const FeaturesSection = () => {
    return (
        <section
            id="features"
            className="
                scroll-mt-24
                border-y
                border-slate-200/80
                bg-white/45
                px-5
                py-28
                sm:px-8
                dark:border-slate-800
                dark:bg-slate-950/20
            "
        >
            <div className="mx-auto max-w-6xl">

                <SectionHeading
                    eyebrow="FEATURES"
                    title="Everything important. Nothing unnecessary."
                    description="TaskFlow gives you the essential tools to organize work, understand priorities and see progress without creating another complicated system."
                />


                <div
                    className="
                        mt-16
                        grid
                        gap-5
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    <FeatureCard
                        icon={<Layers3 />}
                        title="Smart task management"
                        text="Create tasks with descriptions, status, priority and due dates so every piece of work has clear context."
                    />

                    <FeatureCard
                        icon={<Target />}
                        title="Priority first"
                        text="Separate low, medium and high-priority work so you can quickly understand what deserves attention."
                    />

                    <FeatureCard
                        icon={<BarChart3 />}
                        title="Progress visibility"
                        text="See pending, in-progress and completed work from one focused dashboard."
                    />

                    <FeatureCard
                        icon={<Clock3 />}
                        title="Due-date awareness"
                        text="Keep upcoming deadlines visible and reduce the chance of important work being forgotten."
                    />

                    <FeatureCard
                        icon={<Zap />}
                        title="Fast workflow"
                        text="Create, update and complete tasks with a simple interface designed for everyday use."
                    />

                    <FeatureCard
                        icon={<ShieldCheck />}
                        title="Protected workspace"
                        text="Authentication and user-specific task access keep each workspace separated."
                    />
                </div>

            </div>
        </section>
    );
};


export default FeaturesSection;