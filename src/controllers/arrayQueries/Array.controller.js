import { Movie } from "../../models/movie.model.js";

//easy
//$in → any one matches (most common)
//$all → all must match (strict filter)
//$elemMatch →	Matches if at least one element in the array matches multiple conditions together
//$size	→ Matches arrays with exactly the given length
//$slice	Used in projections to return only a portion of an array field (NOT for matching)
//$addToSet	Adds an element to an array only if it doesn’t already exist (used in updates)
//$push	Pushes (appends) an element to an array (even if it already exists
//$pull	Removes all array elements that match a condition
//$pop	Removes the first or last element of an array (-1 for first, 1 for last)

const getMoviesByCountries = async (req, res) => {
  const { countries } = req.body; // array → e.g., ["US", "GB"]

  try {
    const movies = await Movie.find({ origin_country: { $in: countries } });
    res.json({
      message: "Movies Fetched Successfully",
      data: movies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMoviesByAllCountries = async (req, res) => {
  const { countries } = req.body; // array → e.g., ["US", "GB"]

  try {
    const movies = await Movie.find({ origin_country: { $all: countries } });
    res.json({
      message: "Movies Fetched Successfully",
      data: movies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMoviesByGenreDetails = async (req, res) => {
  const { id, name } = req.body; // e.g., { id: 28, name: "Action" }

  try {
    const movies = await Movie.find({
      genres: { $elemMatch: { id, name } },
    });
    res.json({
      message: "Movies Fetched Successfully",
      data: movies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMoviesByCountrySize = async (req, res) => {
  const { count } = req.body; // e.g., 2

  try {
    const movies = await Movie.find({ origin_country: { $size: count } });
    res.json({
      message: "Movies Fetched Successfully",
      data: movies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMoviesWithSlicedGenres = async (req, res) => {
  const count = parseInt(req.params.count); // e.g., 2

  try {
    const movies = await Movie.find({}, { genres: { $slice: count } });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addUniqueGenre = async (req, res) => {
  const { id, genre } = req.body; // e.g., id: "movieId", genre: { id: 35, name: "Comedy" }

  try {
    const GenreFinder = await Movie.findOne({ id: id, "genres.id": genre.id });
    if (GenreFinder) {
      return res.status(200).json({
        message: "Genre is already present",
      });
    }
    await Movie.updateOne({ id: id }, { $addToSet: { genres: genre } });
    res.json({ message: "Genre added " });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const pushGenre = async (req, res) => {
  const { id, genre } = req.body;

  try {
    await Movie.updateOne({ id: id }, { $push: { genres: genre } });
    res.json({ message: "Genre pushed into array" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeGenre = async (req, res) => {
  const { id, genreId } = req.body;

  try {
    const findGenre = await Movie.findOne({ id: id, "genres.id": genreId });
    if (!findGenre) {
      return res.status(200).json({
        message: "Genre is not present in the given movie",
      });
    }
    await Movie.updateOne({ id: id }, { $pull: { genres: { id: genreId } } });
    res.json({ message: "Genre removed from array" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const popGenre = async (req, res) => {
  const { id, direction } = req.body;
  console.log(id, direction);
  if (direction !== -1 && direction !== 1) {
    return res.status(400).json({
      message: "Please enter 1 (last) or -1 (first) for direction",
    });
  }

  try {
    const movie = await Movie.findOne({ id: id });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    if (!movie.genres || movie.genres.length === 0) {
      return res.status(400).json({
        message: "No genres available to pop",
      });
    }

    await Movie.updateOne({ id: id }, { $pop: { genres: direction } });

    res.json({
      message: direction === 1 ? "Last genre popped" : "First genre popped",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getMoviesByCountries,
  getMoviesByAllCountries,
  getMoviesByGenreDetails,
  getMoviesByCountrySize,
  getMoviesWithSlicedGenres,
  addUniqueGenre,
  pushGenre,
  removeGenre,
  popGenre,
};
