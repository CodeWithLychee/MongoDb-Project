import React, { useState } from "react";
import axios from "axios";

const First = () => {
  const [formData, setFormData] = useState({
    adult: false,
    budget: "",
    genres: [{ id: "", name: "" }],
    origin_country: [""],
    original_language: "",
    original_title: "",
    overview: "",
    popularity: "",
    release_date: "",
    revenue: "",
    runtime: "",
    spoken_languages: [{ english_name: "", iso_639_1: "", name: "" }],
    tagline: "",
    vote_average: "",
    vote_count: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGenreChange = (index, field, value) => {
    const newGenres = [...formData.genres];
    newGenres[index][field] = value;
    setFormData((prev) => ({ ...prev, genres: newGenres }));
  };

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...formData.spoken_languages];
    newLanguages[index][field] = value;
    setFormData((prev) => ({ ...prev, spoken_languages: newLanguages }));
  };

  const handleCountryChange = (index, value) => {
    const newCountries = [...formData.origin_country];
    newCountries[index] = value;
    setFormData((prev) => ({ ...prev, origin_country: newCountries }));
  };

  const addGenre = () => {
    setFormData((prev) => ({
      ...prev,
      genres: [...prev.genres, { id: "", name: "" }],
    }));
  };

  const addLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      spoken_languages: [
        ...prev.spoken_languages,
        { english_name: "", iso_639_1: "", name: "" },
      ],
    }));
  };

  const addCountry = () => {
    setFormData((prev) => ({
      ...prev,
      origin_country: [...prev.origin_country, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/update/newAdd",
        formData
      );
      setMessage(response.data.message || "Movie added successfully!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-20">
      <h1 className="text-2xl font-semibold text-center mb-6">Add New Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Adult Checkbox */}
        <div className="flex gap-2">
          <label className="block mb-2 text-sm font-medium">Adult:</label>
          <input
            type="checkbox"
            name="adult"
            checked={formData.adult}
            onChange={handleChange}
            className="h-4 w-4 mt-0.5"
          />
        </div>

        {/* Title */}
        <input
          name="original_title"
          value={formData.original_title}
          onChange={handleChange}
          placeholder="Title"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Language */}
        <input
          name="original_language"
          value={formData.original_language}
          onChange={handleChange}
          placeholder="Language (e.g., en)"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Overview */}
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          placeholder="Overview"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Tagline */}
        <input
          name="tagline"
          value={formData.tagline}
          onChange={handleChange}
          placeholder="Tagline"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Budget */}
        <input
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Budget"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Popularity */}
        <input
          name="popularity"
          value={formData.popularity}
          onChange={handleChange}
          placeholder="Popularity"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Release Date */}
        <input
          name="release_date"
          value={formData.release_date}
          onChange={handleChange}
          placeholder="Release Date (YYYY-MM-DD)"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Revenue */}
        <input
          name="revenue"
          value={formData.revenue}
          onChange={handleChange}
          placeholder="Revenue"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Runtime */}
        <input
          name="runtime"
          value={formData.runtime}
          onChange={handleChange}
          placeholder="Runtime (minutes)"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Vote Average */}
        <input
          name="vote_average"
          value={formData.vote_average}
          onChange={handleChange}
          placeholder="Vote Average"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Vote Count */}
        <input
          name="vote_count"
          value={formData.vote_count}
          onChange={handleChange}
          placeholder="Vote Count"
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Genres */}
        <div>
          <label className="block mb-2 text-sm font-medium">Genres:</label>
          {formData.genres.map((genre, idx) => (
            <div key={idx} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="ID"
                value={genre.id}
                onChange={(e) => handleGenreChange(idx, "id", e.target.value)}
                className="border border-gray-300 p-3 w-1/3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Name"
                value={genre.name}
                onChange={(e) => handleGenreChange(idx, "name", e.target.value)}
                className="border border-gray-300 p-3 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addGenre}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            + Add Genre
          </button>
        </div>

        {/* Origin Countries */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Origin Countries:
          </label>
          {formData.origin_country.map((country, idx) => (
            <div key={idx} className="mb-4">
              <input
                type="text"
                placeholder="Country Code (e.g., US)"
                value={country}
                onChange={(e) => handleCountryChange(idx, e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addCountry}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            + Add Country
          </button>
        </div>

        {/* Spoken Languages */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Spoken Languages:
          </label>
          {formData.spoken_languages.map((lang, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="English Name"
                value={lang.english_name}
                onChange={(e) =>
                  handleLanguageChange(idx, "english_name", e.target.value)
                }
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="ISO 639-1 Code"
                value={lang.iso_639_1}
                onChange={(e) =>
                  handleLanguageChange(idx, "iso_639_1", e.target.value)
                }
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Local Name"
                value={lang.name}
                onChange={(e) =>
                  handleLanguageChange(idx, "name", e.target.value)
                }
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addLanguage}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            + Add Language
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white w-full py-3 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "Adding..." : "Add Movie"}
        </button>

        {/* Success/Error Message */}
        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default First;
