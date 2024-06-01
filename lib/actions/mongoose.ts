import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI)
    return console.log("MONGODB_URI is not defined");

  if (isConnected) return console.log("=> using existing database connection");

  try {
    await mongoose
      .connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
        family: 4, // Use IPv4, skip trying IPv6
      })
      .then(() => console.log("MongoDB connected successfully"))
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
      });

    isConnected = true;

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
