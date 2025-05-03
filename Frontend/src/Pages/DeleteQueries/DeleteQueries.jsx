import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteQueries = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1237/1237946.png"
        alt="Danger Skull"
        className="w-32 h-32 mb-6 animate-pulse"
      />
      <h1 className="text-4xl font-extrabold text-red-600 mb-4 animate-bounce">
        WARNING!!
      </h1>
      <p className="text-center text-lg max-w-2xl mb-8 text-gray-300">
        ⚠️ You are entering a{" "}
        <span className="text-red-500 font-bold">Highly Sensitive Zone</span>.
        <br />
        <br />
        <span className="text-yellow-400">
          Please DO NOT attempt to delete movies from here.
        </span>
        <br />
        <br />
        Deleting movies manually through this UI may cause
        <span className="text-red-500 font-semibold">
          {" "}
          irreversible data loss
        </span>
        ! Always use your database tools like
        <span className="text-blue-400 font-semibold">
          {" "}
          MongoDB Compass, Atlas, or Terminal
        </span>{" "}
        to delete safely.
        <br />
        <br />
        This is your final warning!
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-red-700 hover:bg-red-800 px-6 py-3 rounded-md font-bold text-lg transition"
      >
        Go Back Safely
      </button>
    </div>
  );
};

export default DeleteQueries;
