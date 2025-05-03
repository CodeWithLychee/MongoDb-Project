import React, { useState } from "react";
import axios from "axios";

const Fourth = () => {
  const [language, setLanguage] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!language.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/find/language",
        { language }
      );

      if (response.status === 200 && response.data.data.length > 0) {
        setMovies(response.data.data);
      } else {
        setError("No movies found for this language.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Find Movies by Language
      </h1>

      <form onSubmit={handleSubmit} className="text-center mb-6">
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Enter movie title"
          className="border p-2 w-3/4 sm:w-1/2 mb-4 rounded-md max-w-100"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md ml-5 hover:bg-blue-600 transition-colors"
        >
          Find Movies
        </button>
      </form>

      {loading && <p className="text-center mt-4 text-blue-500">Loading...</p>}

      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              {movie.backdrop_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.original_title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold">{movie.original_title}</h2>
                <p className="mt-2 text-sm">
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p className="mt-2 text-sm">
                  <strong>Language:</strong> {movie.original_language}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fourth;
