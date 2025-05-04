import React, { useState } from "react";
import axios from "axios";

const ThirdElemMatch = () => {
  const [genreId, setGenreId] = useState("");
  const [genreName, setGenreName] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchMoviesByGenre = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/array/get/by-genre-details",
        {
          id: genreId,
          name: genreName,
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
        Fetch Movies by Genre
      </h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Genre ID"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          className="border border-gray-400 p-3 w-full max-w-xs rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter Genre Name"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
          className="border border-gray-400 p-3 w-full max-w-xs rounded-lg"
        />
        <button
          onClick={handleFetchMoviesByGenre}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Fetch Movies by Genre
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-xs text-gray-500">
                  {movie.genres?.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full ">No movies found</p>
        )}
      </div>
    </div>
  );
};

export default ThirdElemMatch;
