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

const router = Router();

//1) Find routes
router.route("/find/all").get(getAllMovies);
router.route("/find/id").get(getMovieById);
router.route("/find/title").get(getMovieByTitle);
router.route("/find/language").get(getMovieByLanguage);
router.route("/find/genre").get(getMoviesByGenre);

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

export default router;
