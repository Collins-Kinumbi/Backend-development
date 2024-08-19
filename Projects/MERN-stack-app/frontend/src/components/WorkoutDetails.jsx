import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import axios from "axios";

function WorkoutDetails({ workout }) {
  const { _id, title, load, reps, createdAt } = workout;

  const { dispatch } = useWorkoutContext();

  async function handleDelete() {
    try {
      const res = await axios.delete(`/api/workouts/${_id}`);

      if (res.status === 200) {
        dispatch({ type: "DELETE_WORKOUT", payload: res.data });
      }
    } catch (error) {
      console.error(
        "Error deleting workout:",
        error.response?.data?.error || error.message
      );
    }
  }

  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>load(kg): </strong>
        {load}
      </p>
      <p>
        <strong>Reps: </strong>
        {reps}
      </p>
      <p>{createdAt}</p>
      <span onClick={handleDelete}>delete</span>
    </div>
  );
}

export default WorkoutDetails;
