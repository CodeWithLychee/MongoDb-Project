import React, { useState } from "react";
import axios from "axios";

const SeventhPush = () => {
  const [movieId, setMovieId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [genreName, setGenreName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePushGenre = async () => {
    if (!movieId || !genreId || !genreName) {
      setMessage("Please fill all fields");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/array/push-genre",
        {
          id: movieId,
          genre: { id: parseInt(genreId), name: genreName },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Failed to push genre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-24 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Push Genre into Movie
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
          placeholder="Genre ID"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          className="border border-gray-400 p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Genre Name"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
          className="border border-gray-400 p-3 rounded-lg"
        />

        <button
          onClick={handlePushGenre}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          disabled={loading}
        >
          {loading ? "Pushing..." : "Push Genre"}
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

export default SeventhPush;
