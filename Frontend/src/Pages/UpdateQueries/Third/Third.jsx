import React, { useState } from "react";
import axios from "axios";

const Third = () => {
  const [formData, setFormData] = useState({
    title: "",
    popularityValue: 0,
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
        "http://localhost:3000/api/v1/movie/update/popularity/title-and-popularityValue",
        formData
      );
      setMessage(response.data.message || "Popularity Updated Successfully");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 border-gray-300 border-2 mt-50">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Increase Movie Popularity
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Movie Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Movie Title"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Popularity Value:
          </label>
          <input
            type="number"
            name="popularityValue"
            value={formData.popularityValue}
            onChange={handleChange}
            placeholder="Enter Popularity Value"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white w-full py-3 rounded-md hover:bg-green-600 disabled:bg-gray-300"
        >
          {loading ? "Updating..." : "Update Popularity"}
        </button>

        {message && (
          <p className="text-center mt-4 text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Third;
