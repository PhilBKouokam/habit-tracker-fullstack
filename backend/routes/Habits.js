import express from "express"
import Habit from "../models/Habit.js"

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async(req, res) => {
    try {
        const newHabit = new Habit(req.body);
        await newHabit.save();
        res.json(newHabit);
    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const updated = await Habit.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { returnDocument: "after" }
        );

        if (!updated) {
            return res.status(404).json({ message: "Habit not found" });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Habit.findOneAndDelete({ _id: req.params.id });

        if (!deleted) {
            return res.status(404).json({ message: "Habit not found" });
        }
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;