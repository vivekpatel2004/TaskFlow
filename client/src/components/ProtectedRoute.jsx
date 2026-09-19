import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const {
        user,
        loading,
    } = useAuth();

    const location = useLocation();

    // Wait until session restoration finishes
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc] dark:bg-[#070b16]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    // Logged in
    return <Outlet />;
};

export default ProtectedRoute;