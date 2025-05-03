import React from "react";
import { useNavigate } from "react-router-dom";

function AddNewMovie() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center mt-10">
      <button
        onClick={() => navigate("/addmovie")}
        className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
      >
        Add New Movie
      </button>
    </div>
  );
}

export default AddNewMovie;
