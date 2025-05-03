// import React, { useState } from "react";
// import axios from "axios";

// const Fifth = () => {
//   const [genreName, setGenreName] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [genreSuggestions, setGenreSuggestions] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!genreName.trim()) return;

//     setLoading(true);
//     setError("");
//     setMovies([]);
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/movie/find/genre",
//         { genreName }
//       );

//       if (response.status === 200 && response.data.data.length > 0) {
//         setMovies(response.data.data);
//         setGenreSuggestions(response.data.message);
//       } else {
//         setError("No movies found for this genre.");
//       }
//     } catch (error) {
//       setError("Error fetching data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-semibold text-center mb-6">
//         Find Movies by Genre
//       </h1>

//       <form onSubmit={handleSubmit} className="text-center mb-6">
//         <input
//           type="text"
//           value={genreName}
//           onChange={(e) => setGenreName(e.target.value)}
//           placeholder="Enter genre (e.g., Action, Drama)"
//           className="border p-2 w-3/4 sm:w-1/2 mb-4 rounded-md"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
//         >
//           Find Movies
//         </button>
//       </form>

//       {loading && <p className="text-center mt-4 text-blue-500">Loading...</p>}

//       {error && <p className="text-center mt-4 text-red-500">{error}</p>}

//       {genreSuggestions && (
//         <p className="text-center mt-4 text-gray-500">{genreSuggestions}</p>
//       )}

//       <div className="mt-6">
//         {movies.length > 0 ? (
//           <div>
//             {movies.map((movie) => (
//               <div
//                 key={movie._id}
//                 className="border p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//               >
//                 <h2 className="text-xl font-bold">{movie.original_title}</h2>
//                 <p className="mt-2">
//                   <strong>Release Date:</strong> {movie.release_date}
//                 </p>
//                 <p className="mt-2">
//                   <strong>Genres:</strong>{" "}
//                   {movie.genres.map((g) => g.name).join(", ")}
//                 </p>
//                 <p className="mt-2">
//                   <strong>Overview:</strong>{" "}
//                   {movie.overview || "No overview available."}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center mt-4 text-gray-500">
//             No movies to display.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Fifth;

import React, { useState } from "react";
import axios from "axios";

const Fifth = () => {
  const [genreName, setGenreName] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [genreSuggestions, setGenreSuggestions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!genreName.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/find/genre",
        { genreName }
      );

      if (response.status === 200 && response.data.data.length > 0) {
        setMovies(response.data.data);
        setGenreSuggestions(response.data.message);
      } else {
        setError("No movies found for this genre.");
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
        Find Movies by Genre
      </h1>

      <form onSubmit={handleSubmit} className="text-center mb-6">
        <input
          type="text"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
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

      {genreSuggestions && (
        <p className="text-center mt-4 text-gray-500">{genreSuggestions}</p>
      )}

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
                  <strong>Genres:</strong>{" "}
                  {movie.genres.map((g) => g.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fifth;
