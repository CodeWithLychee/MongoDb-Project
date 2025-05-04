import React, { useState } from "react";
import axios from "axios";

const ThirdLimit = () => {
  const [limit, setLimit] = useState(10);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setError("");
    setMovies([]);

    if (limit <= 0) {
      setError("Please enter a valid limit greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/aggregate/limit",
        { limit }
      );
      setMovies(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  // Function to trim overview to few lines
  const truncateOverview = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center mt-20 w-full">
      <h1 className="text-3xl font-bold mb-6">Fetch Limited Movies</h1>

      <div className="flex flex-col items-center gap-4 mb-6 w-full max-w-md">
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          placeholder="Enter limit (e.g., 5, 10, 20)"
          className="border p-3 rounded-md w-full"
          min="1"
        />

        <button
          onClick={handleFetch}
          className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Fetch Movies
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>

      {loading && <p className="text-center font-semibold">Loading...</p>}

      {movies.length > 0 && (
        <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg bg-white"
            >
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                    : "https://via.placeholder.com/500x281?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {movie.original_title || movie.title}
                </h3>

                <p className="text-gray-700 text-sm mb-2">
                  {truncateOverview(movie.overview)}
                </p>

                <p className="text-yellow-500 font-semibold">
                  IMDb Rating: {movie.vote_average || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThirdLimit;
