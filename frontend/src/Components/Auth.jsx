import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Particles from "./Particles/Particles";
import Button from "./Button";

const Auth = () => {
  const { loginUser, signupUser, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login validation
      if (!formData.email || !formData.password) {
        toast.error("Please fill all fields");
        return;
      }

      try {
        await loginUser(formData.email, formData.password);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
      }
    } else {
      // Signup validation
      if (!formData.name || !formData.email || !formData.phone ||
        !formData.address || !formData.password) {
        toast.error("Please fill all fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const { confirmPassword, ...userDetails } = formData;

      try {
        await signupUser(
          userDetails.name,
          userDetails.email,
          userDetails.phone,
          userDetails.address,
          userDetails.password
        );
        setIsLogin(true); // Switch to login form after successful signup
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  // Redirect if already logged in
  React.useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#ececec]">


      <div className=" shadow-lg rounded-lg p-8 max-w-md w-full backdrop-blur-lg border  border-gray-700 bg-white/10 text-gray-800 ">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          {!isLogin && (
            <>
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium ">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-600"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium ">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-600"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Address Input */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium ">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-600"
                  placeholder="Enter your address"
                  required
                />
              </div>
            </>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-600"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-600"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium ">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-600"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full bg-[#01B707] text-white py-2 px-4 rounded-md hover:bg-orange-800 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button> */}


            <Button 
              text={isLogin ? "Login" : "Sign Up"}
              className= "w-full bg-[#01B707] text-white py-2 px-4 rounded-md transition "
              type= "submit"
            
            />

        </form>

        {/* Toggle Link */}
        <p className="text-sm text-gray-700 mt-4 text-center">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-indigo-400 hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-indigo-500 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>

  );
};

export default Auth;
