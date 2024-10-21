import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentUnsuccessful = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Failed!
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your transaction was not successful. Please try again.
        </p>
        <button
          onClick={handleHomeClick}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentUnsuccessful;
