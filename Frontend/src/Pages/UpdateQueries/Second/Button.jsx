import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPrompt from "../../../Components/PasswordPrompt";

const Button = () => {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleProtectedNavigate = () => {
    setShowPrompt(true);
  };

  const handleSuccess = () => {
    setShowPrompt(false);
    navigate("/add-tagline");
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <button
        onClick={handleProtectedNavigate}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Tagline to Hit Movies
      </button>

      {showPrompt && (
        <PasswordPrompt onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Button;
