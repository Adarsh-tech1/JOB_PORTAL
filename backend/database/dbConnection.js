import mongoose from "mongoose";

let connectionPromise = null;

const dbConnection = async () => {
  if (!process.env.DB_URL) {
    console.log("Failed to connect DB_URL is not configured");
    return;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.DB_URL, {
      dbName: "Job_Portal",
    });
  }

  try {
    await connectionPromise;
    console.log("MongoDB Connected Sucessfully !");
  } catch (error) {
    connectionPromise = null;
    console.log(`Failed to connect ${error.message}`);
  }
};

export default dbConnection;
