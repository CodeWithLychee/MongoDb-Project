import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//import router
import movieRouter from "./routes/movie.routes.js";

app.use("/api/v1/movie", movieRouter);

export { app };
