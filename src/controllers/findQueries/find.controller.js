import { Movie } from "../../models/movie.model.js";
import { Genre } from "../../models/genre.model.js";

const getAllMovies = async (req, res) => {
  try {
    const all_movies = await Movie.find({});

    res
      .status(200)
      .json({ message: "All movies fetched Succesfully", data: all_movies });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMovieByTitle = async (req, res) => {
  try {
    const { title } = req.body;

    const regex = new RegExp(title, "i");
    //let say title = work
    //then regex becomes /work/

    const movie = await Movie.find({
      original_title: { $regex: regex },
    });

    res.status(200).json({
      message: "Movies fetched Succesfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.body;

    const movie = await Movie.find({ id });

    res.status(200).json({
      message: "Movie Fetch Succesfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMovieByLanguage = async (req, res) => {
  try {
    const { language } = req.body;

    const moviesByLanguage = await Movie.find({ original_language: language });

    res.status(200).json({
      data: moviesByLanguage,
      message:
        "Movie Fetched Successfully . You can also try searching movies by languages = en , ja , te",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMoviesByGenre = async (req, res) => {
  try {
    const { genreName } = req.body;

    const moviesByGenre = await Movie.find({
      "genres.name": { $regex: genreName, $options: "i" },
    });

    const genres = await Genre.find({});
    const all_genre = genres.map((genre) => genre.name);

    let message = "You can also try searching genres from these ";

    message += all_genre.map((g) => g);
    res.status(200).json({ message, data: moviesByGenre });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export {
  getAllMovies,
  getMovieById,
  getMovieByLanguage,
  getMoviesByGenre,
  getMovieByTitle,
};
