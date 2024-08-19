import { useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

function WorkoutForm() {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Send a post request to workouts api
  async function handleSubmit(e) {
    e.preventDefault();

    const workout = { title, load, reps };

    try {
      const res = await axios.post("/api/workouts", workout, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        setEmptyFields(null);
        console.log("Workout added:", res.data);
        dispatch({ type: "CREATE_WORKOUT", payload: res.data });
      } else {
        setError(res.data.error || "Something went wrong.");
      }
    } catch (error) {
      // Set error state if the request fails
      // console.log(error);
      setError(
        error.response?.data?.error ||
          "An error occurred while adding the workout."
      );
      setEmptyFields(error.response?.data?.emptyFields);
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
        className={emptyFields.includes("title") ? "error" : ""}
      />
      {/* Load */}
      <label htmlFor="load">Load (in kg): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        id="load"
        className={emptyFields.includes("load") ? "error" : ""}
      />
      {/* Reps */}
      <label htmlFor="reps">Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        id="reps"
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add workout</button>

      {/* Display Error */}
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
