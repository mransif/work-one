import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]); 
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    // ✅ Function to get mock questions
    const getMockQuestions = async (setName) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendurl}/api/user/mocktest/${setName}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Pass token if required
                }
            });

            if (data) {
                setQuestions(data.questions);
                toast.success(`Questions for ${setName} loaded successfully`);
                console.log(data.questions); 
            } else {
                toast.error("No questions found");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load questions");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Login Function
    const loginUser = async (email, password) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendurl}/api/user/login`, { email, password });

            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
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

    // ✅ Signup Function
    const signupUser = async (name, email, phone, address, password) => {
        try {
            const { data } = await axios.post(`${backendurl}/api/user/register`, { name, email, phone, address, password });

            if (data.success) {
                toast.success("Signup successful, please login");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Signup failed");
        }
    };

    // ✅ Logout Function
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
        questions,           // ✅ Add questions to context
        getMockQuestions,    // ✅ Expose function in context
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
