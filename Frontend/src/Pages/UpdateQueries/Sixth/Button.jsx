import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPrompt from "../../../Components/PasswordPrompt"; // adjust the path if needed

const Button = () => {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleProtectedNavigate = () => {
    setShowPrompt(true);
  };

  const handleSuccess = () => {
    setShowPrompt(false);
    navigate("/mark-adult");
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleProtectedNavigate}
        className="bg-blue-500 mt-10 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
      >
        Mark 'XXX' Movies as Adult
      </button>

      {showPrompt && (
        <PasswordPrompt onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Button;
