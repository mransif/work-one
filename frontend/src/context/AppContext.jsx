import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [scores, setScores] = useState([]);
    const [mainTestScores, setMainTestScores] = useState([]);
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    // Function to get mock questions - Wrapped in useCallback to prevent unnecessary recreations
    const getMockQuestions = useCallback(async (setName) => {
        if (!token) return;
        
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
    }, [token, backendurl]);

    // Function to retrieve mock test scores - Wrapped in useCallback
    const getMockTestScores = useCallback(async () => {
        if (!userId || !token) return;
    
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendurl}/api/user/mocktest-scores/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if (data.success) {
                setScores(data.scores);
            } else {
                setScores([]);
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
            // toast.error("Failed to retrieve scores");    
            setScores([]);
        } finally {
            setLoading(false);
        }
    }, [userId, token, backendurl]);

    // Function to retrieve main test scores - Wrapped in useCallback
    const getMainTestScores = useCallback(async () => {
        if (!userId || !token) return;

        try {
            setLoading(true);
            const { data } = await axios.get(`${backendurl}/api/user/maintest-scores/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        
            if (data.success) {
                setMainTestScores(data.scores);
            } else {
                setMainTestScores([]);
                // Use warning instead of error to avoid confusion when there are no scores yet
                toast.warning(data.message || "No main test scores found");
            }
        } catch (error) {
            console.error("Error fetching main test scores:", error);
            // Only show error toast when it's not a 404 (no scores yet)
            if (error.response && error.response.status !== 404) {
                toast.error("Failed to retrieve main test scores");
            }
            setMainTestScores([]);
        } finally {
            setLoading(false);
        }
    }, [userId, token, backendurl]);

    // Login function
    const loginUser = async (email, password) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendurl}/api/user/login`, { email, password });

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);

                setToken(data.token);
                setUserId(data.userId);
                
                // Toast success before fetching scores
                toast.success("Login successful");
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

    // Signup function
    const signupUser = async (name, email, phone, address, password) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${backendurl}/api/user/register`, { name, email, phone, address, password });

            if (data.success) {
                toast.success("Signup successful, please login");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Signup failed");
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setToken(null);
        setUserId(null);
        setScores([]);
        setMainTestScores([]);
        toast.success("Logged out successfully");
    };

    // Submit mock test results
    const submitMockTestResult = async (setName, score, questions) => {
        if (!userId || !token) return;
        
        try {
            setLoading(true);
            const result = {
                studentId: userId,
                setName,
                score,
                questions,
            };

            const { data } = await axios.post(
                `${backendurl}/api/user/submit-mocktest`, 
                result,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                // toast.success("Mock test results submitted successfully");
                getMockTestScores();
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

    // Submit main test results
    const submitTestResult = async (setName, score, questions) => {
        if (!userId || !token) return;
        
        try {
            setLoading(true);
            const result = {
                studentId: userId,
                setName,
                score,
                questions,
            };

            const { data } = await axios.post(
                `${backendurl}/api/user/submit-maintest`, 
                result,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                // toast.success("Main test results submitted successfully");
                // We'll fetch the scores after submission is successful
                await getMainTestScores();
            } else {
                toast.error(data.message || "Failed to submit main test");
            }
        } catch (error) {
            console.error("Error submitting main test:", error);
            toast.error("Failed to submit main test");
        } finally {
            setLoading(false);
        }
    };

    // Effect to load user data on authentication changes
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");

        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);
        }
    }, []);

    // Separate effect to fetch scores when userId and token are available
    useEffect(() => {
        if (userId && token) {
            // Use Promise.all to fetch both sets of scores in parallel
            Promise.all([
                getMockTestScores(),
                getMainTestScores()
            ]).catch(error => {
                console.error("Error fetching scores:", error);
            });
        }
    }, [userId, token, getMockTestScores, getMainTestScores]);

    const value = {
        token,
        userId,
        scores,
        mainTestScores,
        setToken,
        loading,
        questions,
        getMockQuestions,
        getMockTestScores,
        getMainTestScores,
        loginUser,
        signupUser,
        logoutUser,
        submitMockTestResult,
        submitTestResult,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;