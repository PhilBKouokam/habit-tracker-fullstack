import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import habitRoutes from "./routes/Habits.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use("/habits", habitRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/habitTracker")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.listen(4500, () => {
    console.log("Server is running on port 4500")
})