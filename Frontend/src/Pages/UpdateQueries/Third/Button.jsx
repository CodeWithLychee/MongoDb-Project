import React from "react";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-10">
      <button
        onClick={() => {
          navigate("/increase-popularity");
        }}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
      >
        Increase Movie Popularity
      </button>
    </div>
  );
};

export default Button;
