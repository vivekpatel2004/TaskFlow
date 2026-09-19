import {
    ArrowRight,
} from "lucide-react";


const FinalCTA = ({
    openAuth,
}) => {
    return (
        <section
            className="
                px-5
                pb-28
                sm:px-8
            "
        >
            <div
                className="
                    relative
                    mx-auto
                    max-w-6xl
                    overflow-hidden
                    rounded-[34px]
                    bg-gradient-to-br
                    from-violet-600
                    via-indigo-600
                    to-blue-600
                    px-7
                    py-16
                    text-white
                    shadow-2xl
                    shadow-indigo-500/20
                    sm:px-12
                    sm:py-20
                "
            >

                <div
                    className="
                        absolute
                        -right-24
                        -top-24
                        h-72
                        w-72
                        rounded-full
                        bg-white/10
                        blur-3xl
                    "
                />


                <div
                    className="
                        relative
                        flex
                        flex-col
                        items-start
                        justify-between
                        gap-8
                        md:flex-row
                        md:items-center
                    "
                >

                    <div>

                        <p
                            className="
                                text-xs
                                font-black
                                uppercase
                                tracking-[0.2em]
                                text-indigo-100
                            "
                        >
                            START TODAY
                        </p>

                        <h2
                            className="
                                mt-4
                                max-w-2xl
                                text-4xl
                                font-black
                                leading-tight
                                tracking-tight
                                sm:text-5xl
                            "
                        >
                            Stop keeping work
                            in your head.

                            <br />

                            Put it into motion.
                        </h2>

                        <p
                            className="
                                mt-5
                                max-w-xl
                                text-sm
                                leading-7
                                text-indigo-100
                            "
                        >
                            Create your TaskFlow workspace
                            and start turning scattered
                            responsibilities into clear,
                            manageable progress.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            openAuth("register")
                        }
                        className="
                            inline-flex
                            shrink-0
                            items-center
                            gap-2
                            rounded-2xl
                            bg-white
                            px-6
                            py-4
                            text-sm
                            font-black
                            text-indigo-600
                            shadow-xl
                            transition
                            hover:-translate-y-1
                        "
                    >
                        Create free account

                        <ArrowRight size={17} />
                    </button>

                </div>

            </div>
        </section>
    );
};


export default FinalCTA;