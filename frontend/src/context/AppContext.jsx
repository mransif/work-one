import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    // Login Function
    const loginUser = async (email, password) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendurl}/api/user/login`, { email, password });

            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                console.log(data)
                toast.success("Logged in successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

    // Signup Function
    const signupUser = async (name, email, phone, address, password) => {
        try {
            const { data } = await axios.post(`${backendurl}/api/user/register`, { name, email, phone, address, password });

            if (data.success) {
                toast.success("Signup successful, please login");
                console.log(data)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Signup failed");
        }
    };

    // Logout Function
    const logoutUser = () => {
        localStorage.removeItem("token");
        setToken(null);
        toast.success("Logged out successfully");
    };

    useEffect(() => {
        if (!token) {
            localStorage.removeItem("token");
        }
    }, [token]);

    const value = {
        token,
        loading,
        loginUser,
        signupUser,
        logoutUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
