import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("adminToken") || null);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [questions, setQuestions] = useState([]);
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    // ✅ Unified request handler to manage loading state
    const handleRequest = async (requestFunc, onSuccess, onError) => {
        setLoading(true);
        try {
            const response = await requestFunc();
            onSuccess(response);
        } catch (error) {
            console.error("Request failed:", error);
            onError(error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch students
    const getStudents = useCallback(() => {
        handleRequest(
            () => axios.get(`${backendurl}/api/admin/students`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            (response) => {
                setStudents(response.data);
                toast.success("Student details loaded successfully");
            },
            () => toast.error("Failed to load student details")
        );
    }, [token, backendurl]);

    // ✅ Fetch questions
    const getQuestions = useCallback((setName) => {
        handleRequest(
            () => axios.get(`${backendurl}/api/admin/mocktest/${setName}`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            (response) => {
                setQuestions(response.data.questions);
                toast.success("Questions loaded successfully");
            },
            () => toast.error("Failed to load questions")
        );
    }, [token, backendurl]);

    // ✅ Add a question
    const addQuestion = (setName, newQuestions) => {
        handleRequest(
            () => axios.post(`${backendurl}/api/admin/add-question`, { setName, questions: newQuestions }, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            () => {
                toast.success("Question added successfully");
                getQuestions(setName);  // Refresh the question list
            },
            () => toast.error("Failed to add question")
        );
    };

    // ✅ Delete a question
    const deleteQuestion = (setName, questionId) => {
        handleRequest(
            () => axios.delete(`${backendurl}/api/admin/delete-question/${setName}/${questionId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            () => {
                toast.success("Question deleted successfully");
                getQuestions(setName);  // Refresh the question list
            },
            () => toast.error("Failed to delete question")
        );
    };

    // ✅ Admin login with token creation time
    const loginAdmin = (email, password) => {
        handleRequest(
            () => axios.post(`${backendurl}/api/admin/login`, { email, password }),
            (response) => {
                if (response.data.token) {
                    // Store token
                    localStorage.setItem("adminToken", response.data.token);
                    // Set token creation time
                    localStorage.setItem("tokenCreationTime", new Date().getTime().toString());
                    setToken(response.data.token);
                    toast.success("Logged in successfully");
                } else {
                    toast.error("Invalid credentials");
                }
            },
            () => toast.error("Login failed")
        );
    };

    // ✅ Admin logout with token creation time cleanup
    const logoutAdmin = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("tokenCreationTime");
        setToken(null);
        toast.success("Logged out successfully");
    };

    // Handle token expiration globally
    useEffect(() => {
        // If no token, nothing to do
        if (!token) return;

        // Check token expiration time
        const tokenCreationTime = parseInt(localStorage.getItem("tokenCreationTime") || "0");
        if (!tokenCreationTime) {
            // If no creation time but we have a token, set it now
            localStorage.setItem("tokenCreationTime", new Date().getTime().toString());
            return;
        }

        const currentTime = new Date().getTime();
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        // Check if token is already expired
        if (currentTime - tokenCreationTime > oneHour) {
            // Token expired, log out
            logoutAdmin();
            return;
        }
        
        // Set timer for automatic logout when token expires
        const timeRemaining = oneHour - (currentTime - tokenCreationTime);
        const logoutTimer = setTimeout(() => {
            logoutAdmin();
        }, timeRemaining);
        
        // Clean up timer on unmount or token change
        return () => clearTimeout(logoutTimer);
    }, [token]);

    const value = {
        token,
        loading,
        students,
        questions,
        getStudents,
        getQuestions,
        addQuestion,
        deleteQuestion,
        loginAdmin,
        logoutAdmin
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;