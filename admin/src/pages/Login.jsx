import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginAdmin, token, loading } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If token is available, redirect to StudentDetails page
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    await loginAdmin(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F4F8D3] p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105">
        <div className="bg-[#A6F1E0] -mx-8 -mt-8 mb-8 p-6 rounded-t-2xl">
          <h2 className="text-3xl font-bold text-center text-[#73C7C7]">
            Admin Login
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-[#73C7C7]">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#73C7C7]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 pl-10 border border-[#73C7C7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#73C7C7]/50"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-[#73C7C7]">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#73C7C7]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 pl-10 border border-[#73C7C7]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#73C7C7]/50"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 text-white bg-[#73C7C7] rounded-lg 
              hover:bg-[#73C7C7]/90 focus:outline-none focus:ring-2 focus:ring-[#73C7C7]/50
              transition duration-300 ease-in-out transform hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;