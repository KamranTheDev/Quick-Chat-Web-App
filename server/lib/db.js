import moongoose from "mongoose";

// function to connect to database

export const connectDB = async () => {
    try {
        moongoose.connection.on("connected", () => console.log("Database connected"));
        await moongoose.connect(`${process.env.MONODB_URI}/chat-app`)
    } catch (error) {
        console.log(error);
    }
}