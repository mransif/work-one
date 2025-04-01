import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [scores, setScores] = useState([]);   // ✅ Added scores state
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    // ✅ Function to get mock questions
    const getMockQuestions = async (setName) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendurl}/api/user/mocktest/${setName}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data) {
                setQuestions(data.questions);
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


    // ✅ Function to retrieve mock test scores
    const getMockTestScores = async () => {
        if (!userId) return;
    
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendurl}/api/user/mocktest-scores/${userId}`);
    
            if (data.success) {
                setScores(data.scores);   // ✅ Store only the scores array
            } else {
                setScores([]);
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
            toast.error("Failed to retrieve scores");
            setScores([]);
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
                localStorage.setItem("userId", data.userId);

                setToken(data.token);
                setUserId(data.userId);

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
        localStorage.removeItem("userId");
        setToken(null);
        setUserId(null);
        setScores([]);   // ✅ Clear scores on logout
        toast.success("Logged out successfully");
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");

        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);
            getMockTestScores();   // ✅ Fetch scores on component mount
        }
    }, []);

    // ✅ Submit mock test results
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
                getMockTestScores();   // ✅ Fetch updated scores after submission
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
        scores,           // ✅ Include scores in context
        setToken,
        loading,
        questions,
        getMockQuestions,
        getMockTestScores,   // ✅ Include function in context
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
