import { Movie } from "../../models/movie.model.js";
import { Genre } from "../../models/genre.model.js";

const deleteAllMovies = async (req, res) => {
  try {
    // const deletedMovies = Movie.deleteMany({});

    res.status(200).json({
      // no_of_movies_deleted: deletedMovies.deletedCount,
      message: "All movies are deleted succesfully from the database",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteByName = async (req, res) => {
  try {
    const { name } = req.params;

    const deletedMovie = await Movie.deleteOne({ original_title: name });

    if (deletedMovie.deletedCount == 0) {
      res.status(200).json({
        message: "No movie found in our database . Try different Movie name",
      });
    } else {
      res.status(200).json({
        message: `Movie deleted Successfully having name : ${name}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovieByLowRatingAndPopularity = async (req, res) => {
  try {
    const { rating, popularity } = req.query;
    const deletedMovies = await Movie.deleteMany({
      $and: [
        {
          vote_average: { $lt: rating },
          popularity: { $lt: popularity },
        },
      ],
    });

    if (deletedMovies.deletedCount == 0) {
      res.status(200).json({
        message: `No movie found which have rating less than ${rating} and popularity less than ${popularity}`,
      });
    }
    res.status(200).json({
      no_of_movies_deleted: deletedMovies.deletedCount,
      message: `Movies having rating and popularity less than ${rating} , ${popularity} respectively are successfully deleted`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAdultMovies = async (req, res) => {
  try {
    const deletedMovies = await Movie.deleteMany({ adult: true });

    if (deletedMovies.deletedCount == 0) {
      res.status(200).json({
        message: "No adult movie found",
      });
    } else {
      res.status(200).json({
        no_of_movies_deleted: deletedMovies.deletedCount,
        message: "All adult movies deleted",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMoviesBeforeYear = async (req, res) => {
  try {
    const { year, month, day } = req.query;

    const deletedMovies = await Movie.deleteMany({
      release_date: { $lt: `${year}-${month}-${day}` },
    });

    if (deletedMovies.deletedCount == 0) {
      res.status(200).json({
        message: `No Movie found before Date : ${year}-${month}-${day}`,
      });
    } else {
      res.status(200).json({
        no_of_movies_deleted: deletedMovies.deletedCount,
        message: `All movie before Date : ${year}-${month}-${day} are deleted`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCorruptMovie = async (req, res) => {
  try {
    const deletedMovies = await Movie.deleteMany({ runtime: { $lte: 0 } });

    if (deletedMovies.deletedCount == 0) {
      res.status(200).json({
        message: `No corrupted movie found`,
      });
    } else {
      res.status(200).json({
        no_of_movies_deleted: deletedMovies.deletedCount,
        message: "All corrupted movies having runtime 0 are deleted",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  deleteAllMovies,
  deleteByName,
  deleteMovieByLowRatingAndPopularity,
  deleteAdultMovies,
  deleteMoviesBeforeYear,
  deleteCorruptMovie,
};
