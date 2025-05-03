import React from "react";
import { useNavigate } from "react-router-dom";
function AllQueries() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">MongoDB Query Pages</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          onClick={() => navigate("/findqueries")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Find Queries
        </button>

        <button
          onClick={() => navigate("/updatequeries")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Update Queries
        </button>

        <button
          onClick={() => navigate("/deletequeries")}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Delete Queries
        </button>

        <button
          onClick={() => navigate("/arrayqueries")}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Array Queries
        </button>

        <button
          onClick={() => navigate("/aggregationqueries")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Aggregation Queries
        </button>
      </div>
    </div>
  );
}

export default AllQueries;
