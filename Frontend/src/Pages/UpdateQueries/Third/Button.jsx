import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPrompt from "../../../Components/PasswordPrompt"; // Correct import

const Button = () => {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleProtectedNavigate = () => {
    setShowPrompt(true);
  };

  const handleSuccess = () => {
    setShowPrompt(false);
    navigate("/increase-popularity");
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  return (
    <div className="text-center mt-10">
      <button
        onClick={handleProtectedNavigate}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
      >
        Increase Movie Popularity
      </button>

      {showPrompt && (
        <PasswordPrompt onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Button;
