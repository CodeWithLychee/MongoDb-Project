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
import AiHelp from "./Pages/AiHelp.jsx";
import FirstSecond from "./Pages/ArrayQueries/FirstSecond.jsx";
import ThirdElemMatch from "./Pages/ArrayQueries/ThirdElemMatch.jsx";
import FourthSize from "./Pages/ArrayQueries/FourthSize.jsx";
import FifthSlice from "./Pages/ArrayQueries/FifthSlice.jsx";
import SixthAddToSet from "./Pages/ArrayQueries/SixthAddToSet.jsx";
import SeventhPush from "./Pages/ArrayQueries/SeventhPush.jsx";
import EigthPull from "./Pages/ArrayQueries/EigthPull.jsx";
import NinePop from "./Pages/ArrayQueries/NinePop.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="queries" element={<AllQueries />} />
      <Route path="aihelp" element={<AiHelp />} />

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
      <Route path="compareCountries" element={<FirstSecond />} />
      <Route path="elemMatch" element={<ThirdElemMatch />} />
      <Route path="size" element={<FourthSize />} />
      <Route path="slice" element={<FifthSlice />} />
      <Route path="addtoset" element={<SixthAddToSet />} />
      <Route path="push" element={<SeventhPush />} />
      <Route path="pull" element={<EigthPull />} />
      <Route path="pop" element={<NinePop />} />

      <Route path="aggregationqueries" element={<AggregationQueries />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
