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

const router = Router();

//1) Find routes
router.route("/find/all").get(getAllMovies);
router.route("/find/:id").get(getMovieById);
router.route("/find/title/:title").get(getMovieByTitle);
router.route("/find/language/:language").get(getMovieByLanguage);
router.route("/find/genre/:genreName").get(getMoviesByGenre);

//2) Delete Routes
router.route("/delete/all").delete(deleteAllMovies);
router.route("/delete/name/:name").delete(deleteByName);
router
  .route("/delete/rating/low-rating-popularity")
  .delete(deleteMovieByLowRatingAndPopularity);
router.route("/delete/adult").delete(deleteAdultMovies);
router.route("/delete/date").delete(deleteMoviesBeforeYear);
router.route("/delete/corruptMovie").delete(deleteCorruptMovie);

export default router;
