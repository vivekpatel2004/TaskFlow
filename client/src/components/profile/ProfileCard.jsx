const ProfileCard = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`
                rounded-3xl
                border border-slate-200/80
                bg-white/80
                shadow-[0_20px_60px_rgba(15,23,42,0.07)]
                backdrop-blur-xl
                dark:border-slate-800
                dark:bg-slate-900/75
                dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default ProfileCard;