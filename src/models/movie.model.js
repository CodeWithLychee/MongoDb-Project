import mongoose from "mongoose";

const movieCollectionSchema = new mongoose.Schema({
  id: Number,
  name: String,
  poster_path: String, //Link
  backdrop_path: String, //Link
});

const spokenLanguageSchema = new mongoose.Schema({
  english_name: String,
  iso_639_1: String,
  name: String,
});

const companySchema = new mongoose.Schema({
  id: Number,
  logo_path: String, //Link
  name: String,
  origin_country: String,
});

const countrySchema = new mongoose.Schema({
  iso_3166_1: String,
  name: String,
});

const movieSchema = new mongoose.Schema(
  {
    adult: {
      type: Boolean,
      default: true,
    },
    backdrop_path: String, //Link
    belongs_to_collection: movieCollectionSchema,
    budget: {
      type: Number,
      default: 0,
    },
    genres: [
      {
        id: Number,
        name: String,
      },
    ],
    homepage: String, //Link
    id: Number,
    imdb_id: String,
    origin_country: [{ type: String }],
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    production_companies: [companySchema],
    production_countries: [countrySchema],
    release_date: String,
    revenue: Number,
    runtime: Number,
    spoken_languages: [spokenLanguageSchema],
    status: String,
    tagline: String,
    title: String,
    video: {
      type: Boolean,
      default: false,
    },
    vote_average: Number,
    vote_count: Number,
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);
