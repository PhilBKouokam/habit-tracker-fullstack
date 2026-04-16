import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();  // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "https://habit-tracker-fullstack-ten.vercel.app",
    credentials: true
}));

import habitRoutes from "./routes/Habits.js"
import authRoutes from "./routes/auth.js"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Stop the server if DB fails
    }
};

// Connect before starting server
connectDB().then(() => {
    app.use("/api/auth", authRoutes);
    app.use("/api/habits", habitRoutes);

    const PORT = process.env.PORT || 4500;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
});