import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPrompt from "../../Components/PasswordPrompt"; // Adjust the import path accordingly

function ArrayQueries() {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [targetRoute, setTargetRoute] = useState("");

  const handleProtectedNavigate = (route) => {
    setTargetRoute(route);
    setShowPrompt(true);
  };

  const handleSuccess = () => {
    setShowPrompt(false);
    navigate(targetRoute);
  };

  const handleCancel = () => {
    setShowPrompt(false);
    setTargetRoute("");
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-8 bg-gray-50 p-8 mt-16">
      <h1 className="text-3xl font-bold text-blue-600 ">
        Array Queries in MongoDB
      </h1>

      <div className="flex flex-col gap-3 w-full max-w-4xl">
        <div className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Search Movie Based On Country
          </p>
          <button
            onClick={() => navigate("/compareCountries")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            $in, $all Query
          </button>
        </div>

        <div className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Search Movie Based On Genre Details
          </p>
          <button
            onClick={() => navigate("/elemMatch")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            $elemMatch Query
          </button>
        </div>

        <div className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Search Movie Based On Country Size
          </p>
          <button
            onClick={() => navigate("/size")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            $size Query
          </button>
        </div>

        <div className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Get Movies with Sliced Genre
          </p>
          <button
            onClick={() => navigate("/slice")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            $slice Query
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-4xl ">
        <div className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Add Unique Genre to Movie
          </p>
          <button
            onClick={() => handleProtectedNavigate("/addToSet")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            $addToSet Query
          </button>
        </div>

        <div className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Push Genre to Movie
          </p>
          <button
            onClick={() => handleProtectedNavigate("/push")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            $push Query
          </button>
        </div>

        <div className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Pull Genre from Movie
          </p>
          <button
            onClick={() => handleProtectedNavigate("/pull")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            $pull Query
          </button>
        </div>

        <div className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Pop Genre from Movie
          </p>
          <button
            onClick={() => handleProtectedNavigate("/pop")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            $pop Query
          </button>
        </div>
      </div>

      {/* Password Prompt Modal */}
      {showPrompt && (
        <PasswordPrompt onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default ArrayQueries;
