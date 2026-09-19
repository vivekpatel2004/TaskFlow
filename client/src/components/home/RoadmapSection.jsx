import {
    RoadmapItem,
    SectionHeading,
} from "./HomeUI";


const RoadmapSection = () => {
    return (
        <section
            className="
                px-5
                pb-28
                sm:px-8
            "
        >
            <div className="mx-auto max-w-6xl">

                <SectionHeading
                    eyebrow="WHAT'S NEXT"
                    title="A foundation that can grow with you."
                    description="TaskFlow can evolve from a personal task manager into a broader productivity platform."
                />


                <div
                    className="
                        mt-12
                        grid
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    <RoadmapItem text="Team workspaces" />

                    <RoadmapItem text="Task comments" />

                    <RoadmapItem text="Notifications" />

                    <RoadmapItem text="Productivity analytics" />
                </div>

            </div>
        </section>
    );
};


export default RoadmapSection;