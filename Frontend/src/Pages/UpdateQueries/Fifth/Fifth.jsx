import React, { useState } from "react";
import axios from "axios";

const Fifth = () => {
  const [formData, setFormData] = useState({
    genre: "",
    newRating: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/update/rating-by-genre",
        formData
      );
      setMessage(response.data.message || "Rating updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto  p-8 bg-white shadow-lg rounded-lg mt-50 border-2 border-gray-300">
      <h1 className="text-2xl font-bold text-center mb-8">
        Update Rating by Genre
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Genre Name:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Enter Genre (e.g., Action)"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">New Rating:</label>
          <input
            type="number"
            step="0.1"
            name="newRating"
            value={formData.newRating}
            onChange={handleChange}
            placeholder="Enter New Rating"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-md font-semibold text-lg transition"
        >
          {loading ? "Updating..." : "Update Rating"}
        </button>

        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Fifth;
