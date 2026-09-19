import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000/api",
});

// Add JWT token automatically to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle expired/invalid JWT
api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Tell AuthContext to logout user
            window.dispatchEvent(
                new Event("taskflow:unauthorized")
            );
        }

        return Promise.reject(error);
    }
);

export default api;