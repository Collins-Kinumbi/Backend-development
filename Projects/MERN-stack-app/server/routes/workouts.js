import express from "express";
import {
  createWorkout,
  getWorkout,
  getWorkouts,
} from "../controllers/workoutController.js";

const router = express.Router();

router
  // GET all workouts
  .get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// PATCH/UPDATE a workout
router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE a workout" });
});

// DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a workout" });
});

export default router;
