import mongoose from "mongoose"

const habitSchema = new mongoose.Schema({
    habitName: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dateAdded: { type: Date, default: Date.now },
    dateCompleted: { type: Date }
});

export default mongoose.model("Habit", habitSchema);