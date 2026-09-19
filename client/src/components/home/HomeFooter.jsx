import {
    Sparkles,
} from "lucide-react";


const HomeFooter = ({
    openAuth,
    scrollToSection,
}) => {
    return (
        <footer
            className="
                border-t
                border-slate-200
                bg-white
                dark:border-slate-800
                dark:bg-[#070b16]
            "
        >
            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-5
                    py-12
                    sm:px-8
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-8
                        md:flex-row
                        md:items-center
                        md:justify-between
                    "
                >

                    <div>
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-indigo-600
                                "
                            >
                                <Sparkles
                                    size={17}
                                    className="text-white"
                                />
                            </div>

                            <span
                                className="
                                    text-lg
                                    font-black
                                "
                            >
                                TaskFlow
                            </span>
                        </div>

                        <p
                            className="
                                mt-3
                                max-w-sm
                                text-sm
                                leading-6
                                text-slate-400
                            "
                        >
                            A focused workspace for turning
                            tasks into meaningful progress.
                        </p>
                    </div>


                    <div
                        className="
                            flex
                            flex-wrap
                            gap-x-6
                            gap-y-3
                        "
                    >
                        <FooterLink
                            text="Features"
                            onClick={() =>
                                scrollToSection(
                                    "features"
                                )
                            }
                        />

                        <FooterLink
                            text="Workflow"
                            onClick={() =>
                                scrollToSection(
                                    "workflow"
                                )
                            }
                        />

                        <FooterLink
                            text="Security"
                            onClick={() =>
                                scrollToSection(
                                    "security"
                                )
                            }
                        />

                        <FooterLink
                            text="About"
                            onClick={() =>
                                scrollToSection(
                                    "about"
                                )
                            }
                        />

                        <FooterLink
                            text="Sign in"
                            onClick={() =>
                                openAuth("login")
                            }
                        />
                    </div>

                </div>


                <div
                    className="
                        mt-10
                        border-t
                        border-slate-200
                        pt-6
                        text-xs
                        text-slate-400
                        dark:border-slate-800
                    "
                >
                    © 2026 TaskFlow. Built for focused work.
                </div>

            </div>
        </footer>
    );
};


const FooterLink = ({
    text,
    onClick,
}) => (
    <button
        type="button"
        onClick={onClick}
        className="
            text-xs
            font-semibold
            text-slate-400
            transition
            hover:text-indigo-600
            dark:hover:text-indigo-400
        "
    >
        {text}
    </button>
);


export default HomeFooter;