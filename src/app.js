import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//import router
import movieRouter from "./routes/movie.routes.js";

app.use("/api/v1/movie", movieRouter);

export { app };
