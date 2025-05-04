import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPrompt from "../../../Components/PasswordPrompt"; // Correct import

function AddNewMovie() {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleProtectedNavigate = () => {
    setShowPrompt(true);
  };

  const handleSuccess = () => {
    setShowPrompt(false);
    navigate("/addmovie");
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <button
        onClick={handleProtectedNavigate}
        className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
      >
        Add New Movie
      </button>

      {showPrompt && (
        <PasswordPrompt onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default AddNewMovie;
