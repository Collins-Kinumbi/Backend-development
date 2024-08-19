import { useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  // Fetch from workouts api
  useEffect(() => {
    async function fetchWorkouts() {
      const res = await axios.get("/api/workouts");
      const { data } = res;
      console.log(data);

      if (res.status === 200) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    }
    fetchWorkouts();
  }, [dispatch]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
