import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
  const mongoDbUrl = process.env.MONGODB_URL;
  if (!mongoDbUrl) {
    console.error("MongoDB Url is missing");
    return;
  }
  try {
    const connectionInstance = await mongoose.connect(
      `${mongoDbUrl}/${DB_NAME}`
    );

    console.log("MongoDB Connected !!");
  } catch (error) {
    console.error("MongoDb connection failed : ", error);
    process.exit(1);
  }
};

export { connectDb };
