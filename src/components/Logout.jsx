import React from 'react'
import { useNavigate } from "react-router-dom";


//The logout functional component to remove the token from the local storage and redirect the user to the login page.
const Logout = () => {

      const navigate = useNavigate();

      const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem("authToken");
        // Redirect to the login page
        navigate("/"); 
      };
  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout