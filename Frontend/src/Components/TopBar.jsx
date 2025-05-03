import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // make sure you are using react-router-dom

function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname !== "/") {
      navigate(-1); // go back one page
    }
    // If already on homepage, do nothing
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-500 flex items-center justify-center gap-10 p-4">
      <button
        onClick={handleBack}
        className="absolute left-4 text-white text-3xl hover:opacity-75 border-2 rounded-full pb-5 w-10 h-10  flex justify-center items-center pt-4"
      >
        ←
      </button>
      <a href="/" className="font-bold hover:underline">
        Home
      </a>
      <a href="/queries" className="font-bold hover:underline">
        MongoDbQueries
      </a>
      <a href="/about" className="font-bold hover:underline">
        About Us
      </a>
    </div>
  );
}

export default TopBar;
