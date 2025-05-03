import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/movie/find/all"
        );
        console.log(response);
        setMovies(response.data.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 pt-20 mx-3">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Movies</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2">
                  {movie.title || movie.original_title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {movie.overview || "No description available."}
                </p>
                <p className="text-yellow-600 font-semibold">
                  IMDb Rating: {movie.vote_average || "N/A"}
                </p>
                <p className="text-yellow-600 font-semibold">
                  Movie ID : {movie.id || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
