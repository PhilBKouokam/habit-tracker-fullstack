import mongoose from "mongoose"

const habitSchema = new mongoose.Schema({
    habitName: { 
        type: String, 
        required: true 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    dateAdded: { 
        type: Date, 
        default: Date.now 
    },
    dateCompleted: { 
        type: Date 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } // This links each habit to a specific user
});

export default mongoose.model("Habit", habitSchema);