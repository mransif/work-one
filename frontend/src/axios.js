import axios from "axios";

// Base URL from environment variable
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: backendUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

// ✅ Automatically attach token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
