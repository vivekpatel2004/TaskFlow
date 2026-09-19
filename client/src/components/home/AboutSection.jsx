const AboutSection = () => {
    return (
        <section
            id="about"
            className="
                scroll-mt-24
                px-5
                py-28
                sm:px-8
            "
        >
            <div className="mx-auto max-w-6xl">

                <div
                    className="
                        rounded-[32px]
                        border
                        border-slate-200
                        bg-white/75
                        p-7
                        shadow-[0_25px_80px_rgba(15,23,42,0.07)]
                        backdrop-blur-xl
                        sm:p-12
                        dark:border-slate-800
                        dark:bg-slate-900/70
                    "
                >
                    <div
                        className="
                            grid
                            gap-12
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
                                    text-indigo-600
                                    dark:text-indigo-400
                                "
                            >
                                ABOUT TASKFLOW
                            </p>

                            <h2
                                className="
                                    mt-5
                                    text-4xl
                                    font-black
                                    tracking-tight
                                    sm:text-5xl
                                "
                            >
                                Designed around{" "}

                                <span
                                    className="
                                        text-indigo-600
                                        dark:text-indigo-400
                                    "
                                >
                                    clarity.
                                </span>
                            </h2>

                            <p
                                className="
                                    mt-6
                                    leading-8
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                TaskFlow is a full-stack
                                productivity workspace built
                                around one simple idea: make it
                                easier to understand what needs
                                to be done next.
                            </p>

                            <p
                                className="
                                    mt-5
                                    leading-8
                                    text-slate-500
                                    dark:text-slate-400
                                "
                            >
                                Instead of filling the interface
                                with unnecessary complexity,
                                TaskFlow keeps tasks, priorities
                                and progress in one focused
                                workspace.
                            </p>

                        </div>


                        <div
                            className="
                                grid
                                gap-4
                                sm:grid-cols-2
                            "
                        >
                            <AboutCard
                                title="Simple by design"
                                text="A focused interface keeps important information visible."
                            />

                            <AboutCard
                                title="Full-stack foundation"
                                text="React, Node.js, Express and MySQL work together behind the product."
                            />

                            <AboutCard
                                title="Built to grow"
                                text="The architecture can later support teams, comments and notifications."
                            />

                            <AboutCard
                                title="Practical product"
                                text="The goal is a useful workflow, not just another demo screen."
                            />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};


const AboutCard = ({
    title,
    text,
}) => (
    <div
        className="
            rounded-[24px]
            border
            border-slate-200
            bg-slate-50/80
            p-6
            dark:border-slate-800
            dark:bg-slate-950/50
        "
    >
        <div
            className="
                mb-4
                h-2
                w-8
                rounded-full
                bg-indigo-500
            "
        />

        <h3 className="font-black">
            {title}
        </h3>

        <p
            className="
                mt-2
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
            "
        >
            {text}
        </p>
    </div>
);


export default AboutSection;