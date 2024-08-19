import { useState } from "react";
import axios from "axios";

function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const workout = { title, load, reps };

    try {
      const res = await axios.post("/api/workouts", workout, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Assuming your API returns a status and data
      if (res.status === 200) {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        console.log("Workout added:", res.data);
      } else {
        setError(res.data.error || "Something went wrong.");
      }
    } catch (error) {
      // Set error state if the request fails
      setError(
        error.response?.data?.error ||
          "An error occurred while adding the workout."
      );
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      {/* Title */}
      <label htmlFor="title">Exercise name: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        id="title"
      />
      {/* Load */}
      <label htmlFor="load">Load (in kg): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        id="load"
      />
      {/* Reps */}
      <label htmlFor="reps">Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        id="reps"
      />

      <button>Add workout</button>

      {/* Display Error */}
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
