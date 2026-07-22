import app from "./app.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import dbConnection from "./database/dbConnection.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // CLOUDINARY_CLIENT_NAME
  api_key: process.env.CLOUDINARY_API_KEY, // CLOUDINARY_CLIENT_API
  api_secret: process.env.CLOUDINARY_API_SECRET, // CLOUDINARY_CLIENT_SECRET
});

const port = Number(process.env.PORT) || 4000;
let isShuttingDown = false;

const startServer = async () => {
  try {
    await dbConnection();
    const server = app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use.`);
      } else {
        console.error(error);
      }
      process.exit(1);
    });

    return server;
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

const server = await startServer();

const shutdown = (signal, done) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}. Closing server...`);

  server.close(async () => {
    try {
      await mongoose.connection.close(false);
    } catch (error) {
      console.error("Error while closing MongoDB connection:", error.message);
    } finally {
      if (done) {
        done();
      } else {
        process.exit(0);
      }
    }
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGUSR2", () => {
  shutdown("SIGUSR2", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
