import React, { useState } from "react";
import axios from "axios";

const Second = () => {
  const [voteCountValue, setVoteCountValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!voteCountValue) return;

    setLoading(true);
    setMessage("");
    setMovies([]);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/update/add-tagline-hit",
        {
          vote_count_Value: voteCountValue,
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        setMovies(response.data.data);
      }
    } catch (error) {
      setMessage("Failed to update movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border-2 border-gray-400 rounded-md bg-white mt-50">
      <h1 className="text-2xl font-bold text-center mb-6">
        Add Tagline to Hit Movies
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">
            Vote Count Greater Than:
          </label>
          <input
            type="number"
            value={voteCountValue}
            onChange={(e) => setVoteCountValue(e.target.value)}
            placeholder="Enter minimum vote count"
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Movies"}
        </button>

        {message && (
          <p className="text-center mt-4 font-semibold text-green-600">
            {message}
          </p>
        )}
      </form>

      {movies.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Blockbuster Movies:</h2>
          <ul className="space-y-3">
            {movies.map((movie) => (
              <li key={movie._id} className="border p-4 rounded-md shadow">
                <h3 className="text-lg font-semibold">
                  {movie.original_title}
                </h3>
                <p>Vote Count: {movie.vote_count}</p>
                <p>Tagline: {movie.tagline}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Second;
