import React, { useState } from "react";
import axios from "axios";

const Fourth = () => {
  const [formData, setFormData] = useState({
    id: "",
    newTitle: "",
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
        "http://localhost:3000/api/v1/movie/update/title",
        formData
      );
      setMessage(response.data.message || "Title Updated Successfully!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-50 p-8 bg-white shadow-lg border-2 border-gray-300 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-8">
        Update Movie Title
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Movie ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter Movie ID"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">New Title:</label>
          <input
            type="text"
            name="newTitle"
            value={formData.newTitle}
            onChange={handleChange}
            placeholder="Enter New Movie Title"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-md font-semibold text-lg transition"
        >
          {loading ? "Updating..." : "Update Title"}
        </button>

        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Fourth;
