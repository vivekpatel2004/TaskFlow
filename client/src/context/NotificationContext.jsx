import {
    createContext,
    useContext,
    useCallback,
    useState,
} from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback(
        (message, type = "error") => {
            setNotification({
                id: Date.now(),
                message,
                type,
            });

            setTimeout(() => {
                setNotification(null);
            }, 3500);
        },
        []
    );

    const hideNotification = useCallback(() => {
        setNotification(null);
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notification,
                showNotification,
                hideNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotification must be used inside NotificationProvider"
        );
    }

    return context;
};