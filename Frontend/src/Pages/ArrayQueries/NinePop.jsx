import React, { useState } from "react";
import axios from "axios";

const NinePop = () => {
  const [movieId, setMovieId] = useState("");
  const [direction, setDirection] = useState(1); // 1 = pop last
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePopGenre = async () => {
    setMessage("");
    setError("");

    if (!movieId) {
      setError("Movie ID is required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/array/pop-genre",
        {
          id: movieId,
          direction: parseInt(direction),
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to pop genre"
      );
    }
  };

  return (
    <div className="p-6 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Pop Genre from Movie
      </h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Movie ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="border border-gray-400 p-3 w-full max-w-xs rounded-lg"
        />
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="border border-gray-400 p-3 w-full max-w-xs rounded-lg"
        >
          <option value="1">Pop Last Genre</option>
          <option value="-1">Pop First Genre</option>
        </select>
        <button
          onClick={handlePopGenre}
          className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Pop Genre
        </button>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default NinePop;
