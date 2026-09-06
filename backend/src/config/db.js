import mongoose from "mongoose";
import dns from "node:dns";

// Fix for querySrv ECONNREFUSED with MongoDB Atlas SRV connection strings
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {
  // fallback if DNS custom server cannot be set
}

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`mongodb connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("mongodb connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;