import { Router } from "express";
import {
  getAllMovies,
  getMovieById,
  getMovieByLanguage,
  getMovieByTitle,
  getMoviesByGenre,
} from "../controllers/findQueries/find.controller.js";
import {
  deleteAdultMovies,
  deleteAllMovies,
  deleteByName,
  deleteCorruptMovie,
  deleteMovieByLowRatingAndPopularity,
  deleteMoviesBeforeYear,
} from "../controllers/deleteQueries/delete.controller.js";
import {
  addNewMovie,
  addTaglineToHitMovies,
  increaseMoviePopularity,
  markAdultForXXXMovies,
  updateMovieTitleById,
  updateRatingByGenre,
} from "../controllers/updateQueries/update.controller.js";
import {
  addUniqueGenre,
  getMoviesByAllCountries,
  getMoviesByCountries,
  getMoviesByCountrySize,
  getMoviesByGenreDetails,
  getMoviesWithSlicedGenres,
  popGenre,
  pushGenre,
  removeGenre,
} from "../controllers/arrayQueries/Array.controller.js";
import {
  filterAndProjectMovies,
  getLimitedDocuments,
  groupAggregation,
  sortMovies,
} from "../controllers/aggregationQueries/aggregation.controller.js";

const router = Router();

//1) Find routes
router.route("/find/all").get(getAllMovies);
router.route("/find/title").get(getMovieByTitle);
router.route("/find/id").get(getMovieById);
router.route("/find/language").post(getMovieByLanguage);
router.route("/find/genre").post(getMoviesByGenre);

//2) Delete Routes
router.route("/delete/all").delete(deleteAllMovies);
router.route("/delete/name").delete(deleteByName);
router
  .route("/delete/rating/low-rating-popularity")
  .delete(deleteMovieByLowRatingAndPopularity);
router.route("/delete/adult").delete(deleteAdultMovies);
router.route("/delete/date").delete(deleteMoviesBeforeYear);
router.route("/delete/corruptMovie").delete(deleteCorruptMovie);

//3) update routes
router.route("/update/newAdd").post(addNewMovie);
router.route("/update/add-tagline-hit").post(addTaglineToHitMovies);
router
  .route("/update/popularity/title-and-popularityValue")
  .post(increaseMoviePopularity);
router.route("/update/title").post(updateMovieTitleById);
router.route("/update/rating-by-genre").post(updateRatingByGenre);
router.route("/update/adultMovies").post(markAdultForXXXMovies);

//4) Array Routes
router.route("/array/get/by-countries").post(getMoviesByCountries);
router.route("/array/get/by-all-countries").post(getMoviesByAllCountries);
router.route("/array/get/by-genre-details").post(getMoviesByGenreDetails);
router.route("/array/get/by-country-size").post(getMoviesByCountrySize);
router.route("/array/get/sliced-genres/:count").get(getMoviesWithSlicedGenres);
router.route("/array/add-unique-genre").post(addUniqueGenre);
router.route("/array/push-genre").post(pushGenre);
router.route("/array/remove-genre").post(removeGenre);
router.route("/array/pop-genre").post(popGenre);

//5) Aggregation Routes
router.route("/aggregate/sort").post(sortMovies);
router.route("/aggregate/match-project").post(filterAndProjectMovies);
router.route("/aggregate/limit").post(getLimitedDocuments);
router.route("/aggregate/group").post(groupAggregation);

export default router;
