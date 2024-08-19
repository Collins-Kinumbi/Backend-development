import { useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  // Fetch from workouts API
  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await axios.get("/api/workouts");
        const { data } = res;
        console.log(data);

        if (res.status === 200) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        } else {
          console.error(`Error fetching workouts: ${res.status}`);
        }
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      }
    }
    fetchWorkouts();
  }, [dispatch]);

  if (!workouts) {
    return <h4 style={{ textAlign: "center" }}>Loading...</h4>;
  }

  return (
    <div className="home">
      <div className="workouts">
        {workouts.length === 0 ? (
          <h4 style={{ textAlign: "center" }}>No workouts here yet</h4>
        ) : (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
