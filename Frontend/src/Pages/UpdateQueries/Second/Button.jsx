import React from "react";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center mt-10">
      <button
        onClick={() => navigate("/add-tagline")}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Tagline to Hit Movies
      </button>
    </div>
  );
};

export default Button;
