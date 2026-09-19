import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore login session when app starts/refreshed
    useEffect(() => {
        const restoreSession = async () => {
            const token = localStorage.getItem("token");

            // No token = user is logged out
            if (!token) {
                localStorage.removeItem("user");
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const response = await api.get("/users/profile");

                const profile = response.data?.user;

                if (!profile) {
                    throw new Error("User profile not found.");
                }

                // Restore user in React state
                setUser(profile);

                // Keep latest user data locally
                localStorage.setItem(
                    "user",
                    JSON.stringify(profile)
                );
            } catch (error) {
                console.error(
                    "Session restore error:",
                    error
                );

                // Invalid/expired JWT
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    // Handle automatic logout when API returns 401
    useEffect(() => {
        const handleUnauthorized = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        };

        window.addEventListener(
            "taskflow:unauthorized",
            handleUnauthorized
        );

        return () => {
            window.removeEventListener(
                "taskflow:unauthorized",
                handleUnauthorized
            );
        };
    }, []);

    // LOGIN
    const login = async (email, password) => {
        try {
            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            const data = response.data;

            if (!data?.token || !data?.user) {
                throw new Error(
                    "Invalid login response from server."
                );
            }

            // Save JWT
            localStorage.setItem(
                "token",
                data.token
            );

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // Update React state
            setUser(data.user);

            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    // REGISTER
    const register = async (
        name,
        email,
        password
    ) => {
        try {
            const response = await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            return response.data;
        } catch (error) {
            console.error(
                "Registration error:",
                error
            );
            throw error;
        }
    };

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    // Update user after profile edit
    const updateUser = (updatedUser) => {
        setUser(updatedUser);

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                updateUser,
                login,
                register,
                logout,
                loading,
                isAuthenticated: Boolean(user),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};