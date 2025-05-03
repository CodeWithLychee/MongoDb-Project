import React, { useState } from "react";
import axios from "axios";

const Sixth = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState([]);

  const handleMarkAdult = async () => {
    setLoading(true);
    setMessage("");
    setMovies([]);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/update/adultMovies"
      );
      setMessage(response.data.message || "Movies updated successfully!");
      setMovies(response.data.data || []);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-50 p-8 bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-8">
        Mark 'XXX' Movies as Adult
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleMarkAdult}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold text-lg transition"
        >
          {loading ? "Updating..." : "Mark Movies"}
        </button>
      </div>

      {message && <p className="text-center text-green-600 mb-6">{message}</p>}

      {movies.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Adult</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td className="py-2 px-4 border-b">{movie.original_title}</td>
                  <td className="py-2 px-4 border-b">
                    {movie.adult ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Sixth;
