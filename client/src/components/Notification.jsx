import {
    CheckCircle2,
    AlertCircle,
    XCircle,
    Info,
    X,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

import {
    useNotification,
} from "../context/NotificationContext";

const Notification = () => {
    const {
        notification,
        hideNotification,
    } = useNotification();

    const getNotificationStyle = () => {
        switch (notification?.type) {
            case "success":
                return {
                    iconElement: (
                        <CheckCircle2 size={20} />
                    ),
                    wrapperClass:
                        "border-emerald-200 bg-emerald-50 dark:border-emerald-900/60 dark:bg-emerald-950/40",
                    iconClass:
                        "text-emerald-600 dark:text-emerald-400",
                    textClass:
                        "text-emerald-800 dark:text-emerald-300",
                };

            case "warning":
                return {
                    iconElement: (
                        <AlertCircle size={20} />
                    ),
                    wrapperClass:
                        "border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/40",
                    iconClass:
                        "text-amber-600 dark:text-amber-400",
                    textClass:
                        "text-amber-800 dark:text-amber-300",
                };

            case "info":
                return {
                    iconElement: (
                        <Info size={20} />
                    ),
                    wrapperClass:
                        "border-blue-200 bg-blue-50 dark:border-blue-900/60 dark:bg-blue-950/40",
                    iconClass:
                        "text-blue-600 dark:text-blue-400",
                    textClass:
                        "text-blue-800 dark:text-blue-300",
                };

            case "error":
            default:
                return {
                    iconElement: (
                        <XCircle size={20} />
                    ),
                    wrapperClass:
                        "border-red-200 bg-red-50 dark:border-red-900/60 dark:bg-red-950/40",
                    iconClass:
                        "text-red-600 dark:text-red-400",
                    textClass:
                        "text-red-800 dark:text-red-300",
                };
        }
    };

    const styles =
        getNotificationStyle();

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{
                        opacity: 0,
                        x: 80,
                        scale: 0.95,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        x: 80,
                        scale: 0.95,
                    }}
                    transition={{
                        duration: 0.25,
                    }}
                    className="
                        fixed
                        right-5
                        top-5
                        z-[9999]
                        w-[calc(100%-40px)]
                        max-w-[390px]
                    "
                >
                    <div
                        className={`
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            px-4
                            py-4
                            shadow-xl
                            backdrop-blur-xl
                            ${styles.wrapperClass}
                        `}
                    >
                        {/* ICON */}

                        <div
                            className={`
                                mt-0.5
                                shrink-0
                                ${styles.iconClass}
                            `}
                        >
                            {styles.iconElement}
                        </div>

                        {/* MESSAGE */}

                        <p
                            className={`
                                flex-1
                                text-sm
                                font-semibold
                                leading-5
                                ${styles.textClass}
                            `}
                        >
                            {notification.message}
                        </p>

                        {/* CLOSE BUTTON */}

                        <button
                            type="button"
                            onClick={
                                hideNotification
                            }
                            className="
                                shrink-0
                                rounded-lg
                                p-1
                                text-slate-400
                                transition
                                hover:bg-black/5
                                hover:text-slate-700
                                dark:hover:bg-white/10
                                dark:hover:text-slate-200
                            "
                            aria-label="Close notification"
                        >
                            <X size={17} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;