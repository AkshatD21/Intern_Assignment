import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);

      // Save the token in local storage
      localStorage.setItem("authToken", data.token);

      console.log("Login successful");
      console.log("Token:", data.token);

      navigate("/home");  
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error("Wrong credentials!");
      // You can handle the error and provide feedback to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 font-poppins">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <form method="post" action="#" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              name="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
       <ToastContainer position="bottom-center"/>
    </div>
    
  );
};

export default Login;
