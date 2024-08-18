import express from "express";
import Workout from "../models/workoutModel.js";

const router = express.Router();

router
  // GET all workouts
  .get("/", (req, res) => {
    res.json({ message: "GET all workouts" });
  });

// GET a single workout
router.get("/:id", (req, res) => {
  res.json({ message: "GET a single workout" });
});

// POST a new workout
router.post("/", async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({
      title: title,
      load: load,
      reps: reps,
    });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  // res.json({ message: "POST a new workout" });
});

// PATCH/UPDATE a workout
router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE a workout" });
});

// DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a workout" });
});

export default router;
