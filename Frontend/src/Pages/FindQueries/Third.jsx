// import React, { useState } from "react";
// import axios from "axios";

// const Third = () => {
//   const [id, setId] = useState("");
//   const [movie, setMovie] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!id.trim()) return;

//     setLoading(true);
//     setError("");
//     setMovie(null);
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/v1/movie/find/id?id=${id}`
//       );

//       if (response.status === 200 && response.data.data.length > 0) {
//         setMovie(response.data.data[0]);
//       } else {
//         setError("Movie not found.");
//       }
//     } catch (error) {
//       setError("Error fetching data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h1 className="text-2xl font-semibold text-center mb-6">
//         Find Movie by ID
//       </h1>

//       <form onSubmit={handleSubmit} className="text-center">
//         <input
//           type="text"
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//           placeholder="Enter movie ID"
//           className="border p-2 w-3/4 sm:w-1/2 mb-4 rounded-md"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-6 py-2 rounded-md ml-5 hover:bg-blue-600 transition-colors"
//         >
//           Find Movie
//         </button>
//       </form>

//       {loading && <p className="text-center mt-4 text-blue-500">Loading...</p>}

//       {error && <p className="text-center mt-4 text-red-500">{error}</p>}

//       {movie && (
//         <div className="mt-6">
//           <div className="border p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//             <h2 className="text-xl font-bold">{movie.original_title}</h2>
//             <p className="mt-2">
//               <strong>Release Date:</strong> {movie.release_date}
//             </p>
//             <p className="mt-2">
//               <strong>Overview:</strong>{" "}
//               {movie.overview || "No overview available."}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Third;

import React, { useState } from "react";
import axios from "axios";

const Third = () => {
  const [id, setId] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id.trim()) return;

    setLoading(true);
    setError("");
    setMovie(null);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/movie/find/id?id=${id}`
      );

      if (response.status === 200 && response.data.data.length > 0) {
        setMovie(response.data.data[0]);
      } else {
        setError("Movie not found.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-center mb-4">
        Find Movie by ID
      </h1>

      <form onSubmit={handleSubmit} className="text-center mb-4">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter movie ID"
          className="border p-2 w-3/4 sm:w-1/2 mb-4 rounded-md text-sm max-w-100"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md ml-5 hover:bg-blue-600 transition-colors"
        >
          Find Movie
        </button>
      </form>

      {loading && <p className="text-center mt-4 text-blue-500">Loading...</p>}

      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {movie && (
        <div className="mt-4 max-w-xl mx-auto ">
          <div className="flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
            {movie.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt={movie.original_title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <h2 className="text-2xl font-bold">{movie.original_title}</h2>
              <p className="mt-2 text-sm">
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p className="mt-2 text-sm">
                <strong>Overview:</strong>{" "}
                {movie.overview || "No overview available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Third;
