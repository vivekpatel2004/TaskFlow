import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

import HomeNavbar from "./components/home/HomeNavbar";

import {
    NotificationProvider,
} from "./context/NotificationContext";

import Notification from "./components/Notification";

function App() {
    return (
        <NotificationProvider>
            <BrowserRouter>

                {/* ONE GLOBAL NAVBAR */}
                <HomeNavbar />

                {/* GLOBAL NOTIFICATIONS */}
                <Notification />

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/login"
                        element={<Home />}
                    />

                    <Route
                        path="/register"
                        element={<Home />}
                    />

                    <Route
                        element={<ProtectedRoute />}
                    >
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />
                    </Route>

                </Routes>

            </BrowserRouter>
        </NotificationProvider>
    );
}

export default App;