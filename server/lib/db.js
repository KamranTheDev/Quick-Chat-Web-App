import mongoose from "mongoose";

// function to connect to database

export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("Database connected"));
        mongoose.connection.on("error", err => console.error("Mongo connection error:", err));
        mongoose.connection.on("disconnected", () => console.warn("Mongo disconnected"));

        const baseUri = process.env.MONGODB_URI;
        if (!baseUri) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }
        // append database name if not already present
        const dbName = process.env.MONGODB_DB || "chat-app";
        let fullUri = baseUri;
        if (!baseUri.endsWith(dbName)) {
            fullUri = `${baseUri}/${dbName}`;
        }

        await mongoose.connect(fullUri, {
            // `useNewUrlParser` and `useUnifiedTopology` are no longer supported in
            // newer versions of the driver; mongoose enables the correct settings
            // automatically. Only specify the timeout.
            serverSelectionTimeoutMS: 10000 // 10 seconds
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        // rethrow so that the calling code knows connection failed
        throw error;
    }
}