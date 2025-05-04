import React, { useState } from "react";
import axios from "axios";

const CompareCountries = () => {
  const [countriesInput, setCountriesInput] = useState("");
  const [resultAny, setResultAny] = useState([]);
  const [resultAll, setResultAll] = useState([]);
  const [loadingAny, setLoadingAny] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

  const handleFetchAny = async () => {
    setLoadingAny(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/array/get/by-countries",
        {
          countries: countriesInput
            .split(",")
            .map((c) => c.trim().toUpperCase()),
        }
      );
      setResultAny(response.data.data);
    } catch (error) {
      console.error(error);
      setResultAny([]);
    } finally {
      setLoadingAny(false);
    }
  };

  const handleFetchAll = async () => {
    setLoadingAll(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/array/get/by-all-countries",
        {
          countries: countriesInput
            .split(",")
            .map((c) => c.trim().toUpperCase()),
        }
      );
      setResultAll(response.data.data);
    } catch (error) {
      console.error(error);
      setResultAll([]);
    } finally {
      setLoadingAll(false);
    }
  };

  const getImageUrl = (path) => {
    return `https://image.tmdb.org/t/p/w500/${path}`;
  };

  return (
    <div className=" p-6 mt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Movie Comparison by Countries
      </h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter countries comma separated (e.g., US, GB)"
          value={countriesInput}
          onChange={(e) => setCountriesInput(e.target.value)}
          className="border border-gray-400 p-3 w-full max-w-2xl rounded-lg"
        />
        <div className="flex gap-4">
          <button
            onClick={handleFetchAny}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Fetch Movies (Any Country Match)
          </button>
          <button
            onClick={handleFetchAll}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Fetch Movies (All Countries Match)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
            Match ANY Country
          </h2>
          {loadingAny ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : resultAny.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resultAny.map((movie) => (
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
                    <p className="font-semibold text-sm">
                      {movie.original_title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {movie.origin_country?.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No movies found</p>
          )}
        </div>

        {/* Right Side */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
            Match ALL Countries
          </h2>
          {loadingAll ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : resultAll.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resultAll.map((movie) => (
                <div
                  key={movie._id}
                  className="border border-gray-300 rounded-md overflow-hidden shadow hover:scale-105 transition transform duration-300"
                >
                  <img
                    src={getImageUrl(movie.backdrop_path)}
                    alt={movie.original_title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 h-200">
                    <div className="p-3">
                      <p className="font-semibold text-sm">
                        {movie.original_title}
                      </p>
                      <p className="text-xs text-gray-700 mt-2 font-semibold">
                        Origin Countries:
                      </p>
                      <p className="text-xs text-gray-800">
                        {movie.origin_country && movie.origin_country.length > 0
                          ? movie.origin_country.join(", ")
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No movies found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareCountries;
