import express from "express"
import Habit from "../models/Habit.js"
import auth from "../middleware/auth.js"
import mongoose from "mongoose";

const router = express.Router();

// All routes will now require authentication
router.use(auth);  // This protects everything below

router.get("/", async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.userId });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Create new habit
router.post("/", async (req, res) => {
    console.log("Current Mongoose connection state:", mongoose.connection.readyState);
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  try {
    console.log("Received habit data:", req.body);

    const habit = new Habit({
      habitName: req.body.habitName,
      completed: req.body.completed || false,
      dateAdded: req.body.dateAdded || new Date(),
      dateCompleted: req.body.dateCompleted || null,
      user: req.user.userId                    // Use authenticated user ID
    });

    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);

  } catch (error) {
    console.error("Error creating habit:", error);
    res.status(500).json({ 
      message: "Failed to create habit", 
      error: error.message 
    });
  }
});

router.patch("/:id", async (req, res) => {
    try {
        const { completed, dateCompleted } = req.body;

        const updated = await Habit.findByIdAndUpdate(
            req.params.id, 
            {
                completed,
                dateCompleted
            },
            { new: true, returnDocument: 'after' }
        );

        if (!updated) {
            return res.status(404).json({ message: "Habit not found" });
        }

        res.json(updated);
    } catch (err) {
        console.error("Error updating habit:", err);
        res.status(500).json({ 
            message: "Failed to update habit",
            error: err.message 
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Habit.findOneAndDelete({ 
            _id: req.params.id,
            user: req.user.userId
        });

        if (!deleted) {
            return res.status(404).json({ message: "Habit not found" });
        }
        res.json({ message: "Habit Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;