import mongoose from "mongoose";

// function to connect to database

export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database connected"));
        // use the correct environment variable name and ensure the URI is valid
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error("MONGODB_URI is not defined in environment variables");

        // if you want to specify a database name, you can append it here
        // but the provided URI already includes your default DB
        await mongoose.connect(uri);
    } catch (error) {
        console.log(error);
    }
}