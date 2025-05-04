import React, { useState } from "react";
import axios from "axios";

const SixthAddToSet = () => {
  const [movieId, setMovieId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [genreName, setGenreName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/array/add-unique-genre",
        {
          id: movieId,
          genre: {
            id: Number(genreId),
            name: genreName,
          },
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setError("Failed to add genre");
    }
  };

  return (
    <div className="p-6 mt-24 min-h-screen flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Add Unique Genre to a Movie
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          placeholder="Enter Movie ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="border border-gray-400 p-3 rounded-lg"
          required
        />
        <input
          type="number"
          placeholder="Enter Genre ID"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          className="border border-gray-400 p-3 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Enter Genre Name"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
          className="border border-gray-400 p-3 rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Add Genre
        </button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default SixthAddToSet;
