import { Movie } from "../../models/movie.model.js";

// $match	Filters the documents by the filters object we built. Only documents satisfying these conditions pass through.
// $project	Selects only the fields we want to return in the final output. Here, we include only title, genre, rating, release_year.
// $sort -1 des 1 asc
//The $limit restrict the number of documents returned in a query

const sortMovies = async (req, res) => {
  const { field, order } = req.body;
  if (!field || !order || (order !== "asc" && order !== "desc")) {
    return res.status(400).json({ message: "Invalid sorting parameters" });
  }

  const sortOrder = order === "asc" ? 1 : -1;

  try {
    const movies = await Movie.aggregate([
      {
        $sort: {
          [field]: sortOrder,
        },
      },
    ]);

    res.status(200).json({
      message: "Movies sorted",
      data: movies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const filterAndProjectMovies = async (req, res) => {
  try {
    const { genre, minVoteAverage, releaseDateFrom, releaseDateTo } = req.body;
    console.log(req.body);
    const matchCondition = {};

    if (genre) {
      matchCondition["genres.name"] = genre;
    }

    if (minVoteAverage) {
      matchCondition.vote_average = { $gte: Number(minVoteAverage) };
    }

    if (releaseDateFrom || releaseDateTo) {
      matchCondition.release_date = {};
      if (releaseDateFrom) {
        let x = new Date(releaseDateFrom);
        x = x.toISOString().split("T")[0];
        matchCondition.release_date.$gte = x;
      }
      if (releaseDateTo) {
        let x = new Date(releaseDateTo);
        x = x.toISOString().split("T")[0];
        matchCondition.release_date.$lte = x;
      }
    }
    console.log(matchCondition);
    const movies = await Movie.aggregate([
      {
        $match: matchCondition,
      },
      {
        $project: {
          _id: 0,
          title: 1,
          genre: 1,
          vote_average: 1,
          release_date: 1,
          popularity: 1,
          overview: 1,
          backdrop_path: 1,
          original_title: 1,
        },
      },
    ]);

    res.status(200).json({
      message: "Movie fetched Succesfully based on your filters",
      data: movies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLimitedDocuments = async (req, res) => {
  try {
    const limit = parseInt(req.body.limit) || 10;
    const documents = await Movie.aggregate([
      {
        $limit: limit,
      },
    ]);

    res.status(200).json({
      message: `${limit} Movies Fetched`,
      data: documents,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// budget
// popularity
// revenue
// runtime
// vote_average
// vote_count

const groupAggregation = async (req, res) => {
  try {
    const aggregateField = req.body.aggregateField || "budget";

    const result = await Movie.aggregate([
      {
        $group: {
          _id: null,
          minValue: { $min: `$${aggregateField}` },
          maxValue: { $max: `$${aggregateField}` },
          totalSum: { $sum: `$${aggregateField}` },
          averageValue: { $avg: `$${aggregateField}` },
          firstValue: { $first: `$${aggregateField}` },
          lastValue: { $last: `$${aggregateField}` },
        },
      },
    ]);

    res.status(200).json({
      message: "Done ",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  sortMovies,
  filterAndProjectMovies,
  getLimitedDocuments,
  groupAggregation,
};
