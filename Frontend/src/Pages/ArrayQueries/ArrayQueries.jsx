import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPrompt from "../../Components/PasswordPrompt"; // adjust the import path

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
    <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-between w-130">
        <p className="text-lg font-semibold">$in , $all Query</p>
        <button
          onClick={() => navigate("/compareCountries")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-10"
        >
          Search Movie Based On Country
        </button>
      </div>

      <div className="flex items-center justify-between w-130">
        <p className="text-lg font-semibold w-54">$elemMatch Query</p>
        <button
          onClick={() => navigate("/elemMatch")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search Movie Based On Genre Details
        </button>
      </div>

      <div className="flex items-center justify-between w-130">
        <p className="text-lg font-semibold">$size Query</p>
        <button
          onClick={() => navigate("/size")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search Movie Based On Country Size
        </button>
      </div>

      <div className="flex items-center justify-between w-130">
        <p className="text-lg font-semibold">$slice Query</p>
        <button
          onClick={() => navigate("/slice")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Get Movies with Sliced Genre
        </button>
      </div>

      {/* Protected Buttons Start Here */}

      <div className="flex items-center justify-between w-130">
        <p className="text-lg font-semibold">$addToSet Query</p>
        <button
          onClick={() => handleProtectedNavigate("/addToSet")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Unique Genre to movie
        </button>
      </div>

      <div className="flex items-center justify-between w-130">
        <p className="text-lg font-semibold">$push Query</p>
        <button
          onClick={() => handleProtectedNavigate("/push")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Push Genre to movie
        </button>
      </div>

      <div className="flex items-center justify-between w-130">
        <p className="text-lg font-semibold">$pull Query</p>
        <button
          onClick={() => handleProtectedNavigate("/pull")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Pull Genre from movie
        </button>
      </div>

      <div className="flex items-center justify-between w-130">
        <p className="text-lg font-semibold">$pop Query</p>
        <button
          onClick={() => handleProtectedNavigate("/pop")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Pop Genre from movie based on direction
        </button>
      </div>

      {showPrompt && (
        <PasswordPrompt onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default ArrayQueries;
