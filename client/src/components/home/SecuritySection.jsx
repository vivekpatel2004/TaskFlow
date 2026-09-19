import {
    CheckCircle2,
    LockKeyhole,
    ShieldCheck,
    Users,
} from "lucide-react";


const SecuritySection = () => {
    return (
        <section
            id="security"
            className="
                scroll-mt-24
                border-y
                border-slate-200
                bg-slate-50/80
                px-5
                py-28
                sm:px-8
                dark:border-slate-800
                dark:bg-slate-900/30
            "
        >
            <div
                className="
                    mx-auto
                    grid
                    max-w-6xl
                    items-center
                    gap-14
                    lg:grid-cols-[0.8fr_1.2fr]
                "
            >

                <div>

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-emerald-500/10
                            text-emerald-600
                            dark:text-emerald-400
                        "
                    >
                        <LockKeyhole size={25} />
                    </div>

                    <p
                        className="
                            mt-6
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.2em]
                            text-emerald-600
                            dark:text-emerald-400
                        "
                    >
                        SECURITY
                    </p>

                    <h2
                        className="
                            mt-4
                            text-4xl
                            font-black
                            tracking-tight
                            sm:text-5xl
                        "
                    >
                        Your workspace
                        should feel private.
                    </h2>

                    <p
                        className="
                            mt-5
                            max-w-xl
                            leading-8
                            text-slate-500
                            dark:text-slate-400
                        "
                    >
                        TaskFlow uses authenticated access
                        so users work with their own account
                        and their own tasks.
                    </p>

                </div>


                <div
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                    "
                >
                    <SecurityItem
                        icon={<ShieldCheck />}
                        title="JWT authentication"
                        text="Authenticated requests use a protected token-based access flow."
                    />

                    <SecurityItem
                        icon={<LockKeyhole />}
                        title="Password protection"
                        text="Passwords are handled using secure hashing before storage."
                    />

                    <SecurityItem
                        icon={<Users />}
                        title="User-specific data"
                        text="Task operations are associated with the authenticated user."
                    />

                    <SecurityItem
                        icon={<CheckCircle2 />}
                        title="Controlled access"
                        text="Protected routes prevent unauthenticated access to private areas."
                    />
                </div>

            </div>
        </section>
    );
};


const SecurityItem = ({
    icon,
    title,
    text,
}) => (
    <div
        className="
            rounded-[24px]
            border
            border-slate-200
            bg-white
            p-6
            dark:border-slate-800
            dark:bg-slate-900
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
                bg-emerald-500/10
                text-emerald-600
                dark:text-emerald-400
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
                text-slate-500
                dark:text-slate-400
            "
        >
            {text}
        </p>
    </div>
);


export default SecuritySection;