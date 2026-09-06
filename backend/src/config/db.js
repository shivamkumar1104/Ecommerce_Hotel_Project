import mongoose from "mongoose";
 const connectDB = async() => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`mongodb connected: ${connection.connection.host}`);

    }catch(error){
        console.error("mongodb connection failed:", error.message);
        process.exit(1);
    }
 };
 export default connectDB;