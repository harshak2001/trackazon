import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI)
    return console.log("MONGODB_URI is not defined");

  if (isConnected) return console.log("=> using existing database connection");

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    });

    isConnected = true;

    // console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
