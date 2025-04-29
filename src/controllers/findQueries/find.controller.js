import { Movie } from "../../models/movie.model.js";
import { Genre } from "../../models/genre.model.js";

const getAllMovies = async (req, res) => {
  try {
    const all_movies = await Movie.find({});

    res.status(200).json({
      all_movies,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.find({ id });

    res.status(200).json({
      movie_name: movie[0].original_title,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMovieByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    const regex = new RegExp(title, "i");
    //let say title = work
    //then regex becomes /work/

    const movie = await Movie.find({
      original_title: { $regex: regex },
    });

    const movie_names = movie.map((x) => x.original_title);

    res.status(200).json({
      movie_names,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMovieByLanguage = async (req, res) => {
  try {
    const { language } = req.params;

    const moviesByLanguage = await Movie.find({ original_language: language });

    const movies_name = moviesByLanguage.map((movie) => movie.original_title);

    res.status(200).json({
      movies_name,
      message: "You can also try searching movies by languages = en , ja , te",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMoviesByGenre = async (req, res) => {
  try {
    const { genreName } = req.params;

    const moviesByGenre = await Movie.find({
      "genres.name": { $regex: genreName, $options: "i" },
    });

    const movies = moviesByGenre.map((x) => x.original_title);

    const genres = await Genre.find({});
    const all_genre = genres.map((genre) => genre.name);

    let message = "You can also try searching genres from these ";

    message += all_genre.map((g) => g);
    res.status(200).json({ movies, message });
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
