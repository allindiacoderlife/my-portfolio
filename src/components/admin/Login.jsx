"use client";
import React, { useState } from 'react';
import { poiret_one } from "@/lib/fonts";
import { FancyButtonAlt } from "@/components/ui/FancyButton";
import { CiLogin } from "react-icons/ci";

// Login component for admin authentication
export const metadata = {
  title: "Admin Login",
  description: "Login to the admin portal",
};

const username = process.env.NEXT_PUBLIC_USERNAME;
const password = process.env.NEXT_PUBLIC_PASSWORD;

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  console.log("Login component rendered with username:", username);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple client-side authentication
    if (formData.username === username && formData.password === password) {
      // Call the success callback to show AddProject form
      onLoginSuccess();
      setFormData({ username: "", password: "" });
    } else {
      setError("Invalid username or password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 py-10">
      <span
        className={`${poiret_one.className} mb-8 text-2xl text-gray-300`}
      >
        Admin Portal
      </span>

      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-black/20 backdrop-blur-sm">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Login</h2>
          <p className="font-normal text-neutral-400">
            Please enter your credentials to access the admin panel
          </p>
        </div>

        {error && (
          <div className="w-full mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="feild-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="field-input field-input-focus"
              placeholder="Enter your username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="password" className="feild-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="field-input field-input-focus"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="justify-center flex mt-5">
            <FancyButtonAlt 
              title={!isLoading ? "Login" : "Logging in..."} 
              icon={<CiLogin />} 
            />
          </div>
        </form>
      </div>

      <footer
        className={`${poiret_one.className} mt-10 w-full flex justify-center gap-2 opacity-[70%]`}
      >
        &copy;<span>2025 Chirag. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Login;