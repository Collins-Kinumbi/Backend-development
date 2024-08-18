import express from "express";
import {
  createWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
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
router.patch("/:id", updateWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

export default router;
