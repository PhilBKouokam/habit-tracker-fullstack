import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import habitRoutes from "./routes/Habits.js"
import authRoutes from "./routes/auth.js"

dotenv.config();  // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);  // new auth routes
app.use("/api/habits", habitRoutes);

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/habitTracker")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Root route (optional but nice)
app.get("/", (req, res) => {
    res.json({ message: "Habit Tracker API is running..." });
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
})