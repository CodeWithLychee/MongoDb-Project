import { config } from "dotenv";
config({ path: "./.env" });

import { connectDb } from "./db/connectDb.js";
import { app } from "./app.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occur while ruuning app");
  });
