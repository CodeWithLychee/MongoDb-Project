import React from "react";
import { useNavigate } from "react-router";

function AggregationQueries() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-8 bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Movie Aggregation Queries
      </h1>

      {/* Sort Section */}
      <div className="flex items-center justify-between w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold text-gray-800">Sort Movies</p>
        <button
          onClick={() => navigate("/sort")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Sort Movies
        </button>
      </div>

      {/* Match and Project Section */}
      <div className="flex items-center justify-between w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold text-gray-800">
          Filter & Project Movies
        </p>
        <button
          onClick={() => navigate("/matchproject")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Apply Filters & Projection
        </button>
      </div>

      {/* Limit Section */}
      <div className="flex items-center justify-between w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold text-gray-800">
          Limit Movie Results
        </p>
        <button
          onClick={() => navigate("/limit")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Set Limit
        </button>
      </div>

      {/* Group, Min, Max, Sum, etc Section */}
      <div className="flex items-center justify-between w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold text-gray-800">
          Grouping & Aggregation Operations
        </p>
        <button
          onClick={() => navigate("/group")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Apply Group Aggregation
        </button>
      </div>
    </div>
  );
}

export default AggregationQueries;
