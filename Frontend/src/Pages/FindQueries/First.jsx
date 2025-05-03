import React, { useState } from "react";
import axios from "axios";

const First = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/movie/find/all"
      );
      if (response.status === 200 && response.data.data.length > 0) {
        setMovies(response.data.data);
      } else {
        setError("No movies found.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    fetchAllMovies();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-3">
      <h1 className="text-2xl font-semibold text-center mb-6">All Movies</h1>
      <div className="text-center mb-6">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Fetch All Movies
        </button>
      </div>
      {loading && <p className="text-center mt-4 text-blue-500">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {movie.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.original_title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold">{movie.original_title}</h2>
                <p className="mt-2">
                  <strong>Release Date:</strong> {movie.release_date}
                </p>

                <p className="mt-2">
                  <strong>Movie Id:</strong> {movie.id || "No Id available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default First;
