import mongoose from "mongoose";

let connectionPromise = null;

const dbConnection = async () => {
  const databaseUrl = process.env.DB_URL;

  if (!databaseUrl) {
    throw new Error("DB_URL is not configured. Add it to backend/.env.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(databaseUrl, {
        dbName: "Job_Portal",
        serverSelectionTimeoutMS: 5000,
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
  console.log("MongoDB connected successfully.");
};

export default dbConnection;
