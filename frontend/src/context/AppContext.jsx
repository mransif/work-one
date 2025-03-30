import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);  // ✅ Added userId
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    // ✅ Function to get mock questions
    const getMockQuestions = async (setName) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendurl}/api/user/mocktest/${setName}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data) {
                setQuestions(data.questions);
                toast.success(`Questions for ${setName} loaded successfully`);
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

    // ✅ Updated login function to store userId
    const loginUser = async (email, password) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendurl}/api/user/login`, { email, password });

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);   // ✅ Store userId

                setToken(data.token);
                setUserId(data.userId);   // ✅ Set userId

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

    // ✅ Signup function (unchanged)
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

    // ✅ Logout function
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");   // ✅ Remove userId on logout
        setToken(null);
        setUserId(null);  // ✅ Clear userId
        toast.success("Logged out successfully");
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");

        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);   // ✅ Retrieve userId from localStorage
        }
    }, []);

    // ✅ Updated submitMockTestResult to include studentId
    const submitMockTestResult = async (setName, score, questions) => {
        try {
            setLoading(true);
            const result = {
                studentId: userId, 
                setName,
                score,
                questions,
            };

            const { data } = await axios.post(`${backendurl}/api/user/submit-mocktest`, result);

            if (data.success) {
                toast.success(`Mock test score: ${score}`);
            } else {
                toast.error(data.message || "Failed to submit mock test");
            }
        } catch (error) {
            console.error("Error submitting mock test:", error);
            toast.error("Failed to submit mock test");
        } finally {
            setLoading(false);
        }
    };



    const value = {
        token,
        userId,             
        setToken,
        loading,
        questions,
        getMockQuestions,
        loginUser,
        signupUser,
        logoutUser,
        submitMockTestResult,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
