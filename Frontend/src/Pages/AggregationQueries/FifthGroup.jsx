import React, { useState } from "react";
import axios from "axios";

const FifthGroup = () => {
  const [aggregateField, setAggregateField] = useState("budget");
  const [aggregationData, setAggregationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchAggregation = async () => {
    setError("");
    setAggregationData(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/aggregate/group",
        {
          aggregateField,
        }
      );

      setAggregationData(response.data.data[0]);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to fetch aggregation data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center mt-20 w-full">
      <h1 className="text-3xl font-bold mb-6">Group Aggregation of Movies</h1>

      <div className="flex flex-col items-center gap-4 mb-6 w-full max-w-md">
        <select
          value={aggregateField}
          onChange={(e) => setAggregateField(e.target.value)}
          className="border p-3 rounded-md w-full"
        >
          <option value="budget">Budget</option>
          <option value="popularity">Popularity</option>
          <option value="revenue">Revenue</option>
          <option value="runtime">Runtime</option>
          <option value="vote_average">Vote Average</option>
          <option value="vote_count">Vote Count</option>
        </select>

        <button
          onClick={handleFetchAggregation}
          className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Fetch Aggregation
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>

      {loading && <p className="text-center font-semibold">Loading...</p>}

      {aggregationData && (
        <div className="mt-10 w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Aggregation Results</h3>

          <ul>
            <li>
              <strong>Min Value:</strong> {aggregationData.minValue}
            </li>
            <li>
              <strong>Max Value:</strong> {aggregationData.maxValue}
            </li>
            <li>
              <strong>Total Sum:</strong> {aggregationData.totalSum}
            </li>
            <li>
              <strong>Average Value:</strong> {aggregationData.averageValue}
            </li>
            <li>
              <strong>First Value:</strong> {aggregationData.firstValue}
            </li>
            <li>
              <strong>Last Value:</strong> {aggregationData.lastValue}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FifthGroup;
