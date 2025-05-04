import React, { useState } from "react";
import axios from "axios";

const FourthSize = () => {
  const [count, setCount] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchMoviesByCountrySize = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/array/get/by-country-size",
        {
          count: parseInt(count), // Parse the count to ensure it's a number
        }
      );
      setMovies(response.data.data);
    } catch (err) {
      setError("Error fetching movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Fetch Movies by Country Count
      </h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <input
          type="number"
          placeholder="Enter Country Count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="border border-gray-400 p-3 w-full max-w-xs rounded-lg"
        />
        <button
          onClick={handleFetchMoviesByCountrySize}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Fetch Movies by Country Size
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie._id}
              className="border border-gray-300 rounded-md overflow-hidden shadow hover:scale-105 transition transform duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt={movie.original_title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <p className="font-semibold text-sm">{movie.original_title}</p>
                <p>Country Size : {movie.origin_country.length}</p>
                <p className="text-sm text-black">
                  {movie.origin_country?.join(", ")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No movies found</p>
        )}
      </div>
    </div>
  );
};

export default FourthSize;
