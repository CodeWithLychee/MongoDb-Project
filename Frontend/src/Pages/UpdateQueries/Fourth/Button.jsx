import React from "react";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center ">
      <button
        onClick={() => navigate("/update-movie-title")}
        className="bg-blue-500 mt-10 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
      >
        Update Movie Title
      </button>
    </div>
  );
};

export default Button;
