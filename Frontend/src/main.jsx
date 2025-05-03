import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Home from "./Pages/Home.jsx";
import AppLayout from "./Layout/AppLayout.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import AllQueries from "./Pages/AllQueries";
import FindQueries from "./Pages/FindQueries/FindQueries";
import UpdateQueries from "./Pages/UpdateQueries/UpdateQueries.jsx";
import DeleteQueries from "./Pages/DeleteQueries/DeleteQueries.jsx";
import ArrayQueries from "./Pages/ArrayQueries/ArrayQueries.jsx";
import AggregationQueries from "./Pages/AggregationQueries/AggregationQueries.jsx";
import First from "./Pages/UpdateQueries/First/First.jsx";
import Second from "./Pages/UpdateQueries/Second/Second.jsx";
import Third from "./Pages/UpdateQueries/Third/Third.jsx";
import Fourth from "./Pages/UpdateQueries/Fourth/Fourth.jsx";
import Fifth from "./Pages/UpdateQueries/Fifth/Fifth.jsx";
import Sixth from "./Pages/UpdateQueries/Sixth/Sixth.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="queries" element={<AllQueries />} />

      <Route path="findqueries" element={<FindQueries />} />

      <Route path="updatequeries" element={<UpdateQueries />} />
      <Route path="addmovie" element={<First />} />
      <Route path="add-tagline" element={<Second />} />
      <Route path="increase-popularity" element={<Third />} />
      <Route path="update-movie-title" element={<Fourth />} />
      <Route path="update-rating-genre" element={<Fifth />} />
      <Route path="mark-adult" element={<Sixth />} />

      <Route path="deletequeries" element={<DeleteQueries />} />
      <Route path="arrayqueries" element={<ArrayQueries />} />
      <Route path="aggregationqueries" element={<AggregationQueries />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
