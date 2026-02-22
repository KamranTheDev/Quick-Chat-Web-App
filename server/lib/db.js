import mongoose from "mongoose";

// function to connect to database

export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database connected"));
        await mongoose.connect(`${process.env.MONGO_URI}/chat-app`)
    } catch (error) {
        console.log(error);
    }
}