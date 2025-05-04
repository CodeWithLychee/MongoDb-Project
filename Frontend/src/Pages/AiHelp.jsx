import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";

// Initialize GoogleGenerativeAI
const genAI = new GoogleGenerativeAI("AIzaSyDwhU5fK_D9hk5hyiDcpHlsEHqepqyhETY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function AiHelp() {
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = `Recommend a list of movies in the genre "${genre}" and language "${language}". List only movie titles with a short description.`;
    try {
      const result = await model.generateContent(prompt);
      const textResponse = await result.response.text();
      setResponse(textResponse);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse(
        "Unable to fetch movie recommendations at the moment. Please try again later."
      );
    }
  };

  const formatResponse = (text) => {
    if (!text) return null;
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => {
        const cleanLine = line.replace(/\*\*/g, "").trim().replace(/^\* /, "");
        return (
          <motion.li
            key={index}
            className="text-gray-800 text-base leading-6 mb-3 hover:text-blue-600 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {cleanLine}
          </motion.li>
        );
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5 font-roboto">
        <motion.div
          className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col gap-6 mb-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Movie Recommender
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Enter your preferred genre and language to get movie
              recommendations.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="genre"
                  className="text-sm font-medium text-gray-700"
                >
                  Genre:
                </label>
                <input
                  id="genre"
                  type="text"
                  name="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                  className="p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                  placeholder="E.g., Action, Comedy, Thriller"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="language"
                  className="text-sm font-medium text-gray-700"
                >
                  Language:
                </label>
                <input
                  id="language"
                  type="text"
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                  className="p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                  placeholder="E.g., English, Hindi, Korean"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 text-base font-semibold rounded-lg hover:bg-blue-700 transition hover:scale-103 duration-300 transform "
              >
                Get Recommendations
              </button>
            </form>
          </motion.div>

          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recommended Movies
            </h3>
            {response ? (
              <ul className="list-disc pl-5">{formatResponse(response)}</ul>
            ) : (
              <p className="text-gray-500 text-center">
                Your recommendations will appear here.
              </p>
            )}
          </motion.div>

          <motion.div
            className="mt-5"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Optional Image Content */}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
