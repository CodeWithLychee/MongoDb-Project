import React, { useState } from "react";
import axios from "axios";

const SecondMatch = () => {
  const [genre, setGenre] = useState("");
  const [minVoteAverage, setMinVoteAverage] = useState("");
  const [releaseDateFrom, setReleaseDateFrom] = useState("");
  const [releaseDateTo, setReleaseDateTo] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    setError("");
    setMovies([]);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/aggregate/match-project",
        {
          genre,
          minVoteAverage,
          releaseDateFrom,
          releaseDateTo,
        }
      );
      console.log(response.data.data);
      setMovies(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center mt-20 w-full">
      <h1 className="text-3xl font-bold mb-6">Filter & Project Movies</h1>

      {/* Filters */}
      <div className="flex flex-col items-center gap-4 mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Genre (e.g. Action, Drama)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-3 rounded-md w-full"
        />

        <input
          type="number"
          placeholder="Minimum Vote Average"
          value={minVoteAverage}
          onChange={(e) => setMinVoteAverage(e.target.value)}
          className="border p-3 rounded-md w-full"
        />

        <input
          type="date"
          placeholder="Release Date From"
          value={releaseDateFrom}
          onChange={(e) => setReleaseDateFrom(e.target.value)}
          className="border p-3 rounded-md w-full"
        />

        <input
          type="date"
          placeholder="Release Date To"
          value={releaseDateTo}
          onChange={(e) => setReleaseDateTo(e.target.value)}
          className="border p-3 rounded-md w-full"
        />

        <button
          onClick={handleFilter}
          className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Apply Filters
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>

      {loading && <p className="text-center font-semibold">Loading...</p>}

      {/* Movies List */}
      {movies.length > 0 && (
        <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {movies.map((movie, idx) => (
            <div
              key={idx}
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
                <p>
                  <strong>Vote Average:</strong> {movie.vote_average}
                </p>
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                  <strong>Popularity:</strong> {movie.popularity}
                </p>
                <p className="text-gray-600 mt-2">
                  {movie.overview?.slice(0, 100)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecondMatch;
