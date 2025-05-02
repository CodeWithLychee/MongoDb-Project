import { Movie } from "../../models/movie.model.js";

const addNewMovie = async (req, res) => {
  try {
    const {
      adult, //true or false
      budget,
      genres, // should be an array of { name: "GenreName" }
      origin_country,
      original_language,
      original_title,
      overview,
      popularity,
      release_date,
      revenue,
      runtime,
      spoken_languages,
      tagline,
      vote_average,
      vote_count,
    } = req.body;

    console.log(req.body);

    const movie = await Movie.create({
      adult, //true or false
      backdrop_path: "/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg",
      belongs_to_collection: null,
      budget,
      genres, // should be an array of { name: "GenreName" }
      homepage: "https://www.amazon.com/salp/aworkingman?hhf",
      origin_country,
      original_language,
      original_title,
      overview,
      popularity,
      release_date,
      revenue,
      runtime,
      spoken_languages,
      tagline,
      vote_average,
      vote_count,
      video: false,
      poster_path: "/xUkUZ8eOnrOnnJAfusZUqKYZiDu.jpg",
    });

    if (!movie) {
      res.status(500).json({
        message: "Something went wrong while adding new movie to database",
      });
    }

    res.status(201).json({
      message: "New movie added successfully!",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const addTaglineToHitMovies = async (req, res) => {
  try {
    const { vote_count_Value } = req.body;
    const updatedMovies = await Movie.updateMany(
      { vote_count: { $gt: vote_count_Value } },
      { $set: { tagline: "Blockbuster" } }
    );

    const findBlockBusterMovies = await Movie.find({
      tagline: "Blockbuster",
    });

    res.status(200).json({
      message: `No of Movies Updated : ${updatedMovies.modifiedCount}`,
      data: findBlockBusterMovies,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const increaseMoviePopularity = async (req, res) => {
  try {
    const { title, popularityValue } = req.body;

    const updatedMovie = await Movie.findOneAndUpdate(
      { original_title: title },
      { $inc: { popularity: popularityValue } },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res
      .status(200)
      .json({ message: "Popularity Updated Succesfully", updatedMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovieTitleById = async (req, res) => {
  try {
    const { id, newTitle } = req.body;

    const updatedMovie = await Movie.findOneAndUpdate(
      { id },
      { original_title: newTitle },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res
      .status(200)
      .json({ message: "Movie Title Updated Succesfully", data: updatedMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRatingByGenre = async (req, res) => {
  try {
    const { genre, newRating } = req.body;

    const updated = await Movie.updateMany(
      { "genres.name": genre },
      { $set: { vote_average: newRating } }
    );

    if (updated.modifiedCount === 0) {
      return res.status(200).json({
        message: `No movies found with genre '${genre}' to update.`,
      });
    }
    const updatedMovies = await Movie.find({
      "genres.name": genre,
      vote_average: newRating,
    });
    res.status(200).json({
      message: `No of Movies Updated : ${updated.modifiedCount}`,
      data: updatedMovies,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAdultForXXXMovies = async (req, res) => {
  try {
    const updated = await Movie.updateMany(
      { original_title: { $regex: "XXX", $options: "i" } },
      { $set: { adult: true } }
    );

    const findMovies = await Movie.find({
      adult: true,
    });

    res.status(200).json({
      message: `No of Movies Updated : ${updated.modifiedCount}`,
      data: findMovies,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  addNewMovie,
  addTaglineToHitMovies,
  increaseMoviePopularity,
  updateMovieTitleById,
  updateRatingByGenre,
  markAdultForXXXMovies,
};
