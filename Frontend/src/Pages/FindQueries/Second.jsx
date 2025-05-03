import React, { useState } from "react";
import axios from "axios";

const Second = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError(""); // Clear previous error
    setMovies([]); // Clear previous movie data
    console.log("title", title);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/movie/find/title?title=${title}`
      );

      console.log(response);
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

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Find Movie by Name
      </h1>

      <form onSubmit={handleSubmit} className="text-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Second;
