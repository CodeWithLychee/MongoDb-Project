import React, { useState } from "react";
import axios from "axios";

const SortMovies = () => {
  const [field, setField] = useState("");
  const [order, setOrder] = useState("asc");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSort = async () => {
    setError("");
    setMovies([]);
    if (!field) {
      setError("Please select a field to sort by.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/aggregate/sort",
        {
          field,
          order,
        }
      );
      console.log(response.data.data);
      setMovies(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to sort movies");
    } finally {
      setLoading(false);
    }
  };

  const renderFieldValue = (movie) => {
    switch (field) {
      case "revenue":
        return (
          <p>
            <strong>Revenue:</strong> {movie.revenue}
          </p>
        );
      case "budget":
        return (
          <p>
            <strong>Budget:</strong> {movie.budget}
          </p>
        );
      case "release_date":
        return (
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
        );
      case "runtime":
        return (
          <p>
            <strong>Runtime:</strong> {movie.runtime} min
          </p>
        );
      case "vote_count":
        return (
          <p>
            <strong>Vote Count:</strong> {movie.vote_count}
          </p>
        );
      case "vote_average":
        return (
          <p>
            <strong>Vote Average:</strong> {movie.vote_average}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center mt-20 w-full ">
      <h1 className="text-3xl font-bold mb-6">Sort Movies</h1>

      <div className="flex flex-col items-center gap-4 mb-6 w-full max-w-md">
        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="border p-3 rounded-md w-full"
        >
          <option value="">Select Field</option>
          <option value="revenue">Revenue</option>
          <option value="budget">Budget</option>
          <option value="release_date">Release Date</option>
          <option value="runtime">Runtime</option>
          <option value="vote_count">Vote Count</option>
          <option value="vote_average">Vote Average</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border p-3 rounded-md w-full"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button
          onClick={handleSort}
          className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Sort Movies
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>

      {loading && <p className="text-center font-semibold">Loading...</p>}

      {movies.length > 0 && (
        <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div
              key={movie._id}
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
                {renderFieldValue(movie)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortMovies;
