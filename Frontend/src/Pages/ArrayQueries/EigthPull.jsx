import React, { useState } from "react";
import axios from "axios";

const EigthPull = () => {
  const [movieId, setMovieId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRemoveGenre = async () => {
    if (!movieId || !genreId) {
      setMessage("Please fill all fields");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/array/remove-genre",
        {
          id: movieId,
          genreId: parseInt(genreId),
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Failed to remove genre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-24 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Remove Genre from Movie
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Movie ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="border border-gray-400 p-3 rounded-lg"
        />
        <input
          type="number"
          placeholder="Genre ID to Remove"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          className="border border-gray-400 p-3 rounded-lg"
        />

        <button
          onClick={handleRemoveGenre}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          disabled={loading}
        >
          {loading ? "Removing..." : "Remove Genre"}
        </button>

        {message && (
          <p className="text-center mt-4 font-semibold text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default EigthPull;
