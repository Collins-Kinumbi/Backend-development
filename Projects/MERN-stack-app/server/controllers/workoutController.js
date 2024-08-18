import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

// get all workouts
export async function getWorkouts(req, res) {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// get a single workout
export async function getWorkout(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// create new workout
export async function createWorkout(req, res) {
  const { title, load, reps } = req.body;
  // Add document to db
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
}

// update a workout

// delete a workout
