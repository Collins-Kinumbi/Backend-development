import { useEffect, useState } from "react";
import axios from "axios";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
  const [workouts, setWorkouts] = useState(null);

  // Fetch from workouts api
  useEffect(() => {
    async function fetchWorkouts() {
      const res = await axios.get("/api/workouts");
      const { data } = res;
      console.log(data);

      if (res.status === 200) {
        setWorkouts(data);
      }
    }
    fetchWorkouts();
  }, []);
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
