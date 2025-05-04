import React, { useState } from "react";
import axios from "axios";

const FifthSlice = () => {
  const [count, setCount] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    if (!count) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/movie/array/get/sliced-genres/${count}`
      );
      setMovies(response.data);
    } catch (err) {
      setError("Failed to fetch movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path) => {
    return `https://image.tmdb.org/t/p/w500/${path}`;
  };

  return (
    <div className="p-6 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Movies with Sliced Genres
      </h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <input
          type="number"
          placeholder="Enter number of genres to slice"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="border border-gray-400 p-3 w-full max-w-xs rounded-lg"
        />
        <button
          onClick={fetchMovies}
          className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Fetch Movies
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.length > 0
          ? movies.map((movie) => (
              <div
                key={movie._id}
                className="border border-gray-300 rounded-md overflow-hidden shadow hover:scale-105 transition transform duration-300"
              >
                <img
                  src={getImageUrl(movie.backdrop_path)}
                  alt={movie.original_title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <p className="font-semibold text-sm mb-2">
                    {movie.original_title}
                  </p>
                  <div className="text-xs text-gray-500">
                    <p>Genres Length : {movie.genres.length}</p>
                    <p className="font-bold">Genres:</p>
                    {movie.genres?.length > 0 ? (
                      movie.genres.map((genre, idx) => (
                        <p key={idx}>{genre.name}</p>
                      ))
                    ) : (
                      <p>No genres available</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          : !loading && (
              <div className="flex-1 flex justify-center items-center w-370">
                <p className="text-center text-gray-500 text-xl">
                  No movies found
                </p>
              </div>
            )}
      </div>
    </div>
  );
};

export default FifthSlice;
