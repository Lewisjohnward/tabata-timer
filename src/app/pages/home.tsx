import {SetStateAction} from "react";
import AddIcon from "../components/addIcon";
import Header from "../components/header";
import Workout from "../components/workout";
import {Workout as WorkoutType} from "../types/Workout";

type HomeProps = {
    setView: React.Dispatch<SetStateAction<string>>;
    setActiveWorkout: React.Dispatch<SetStateAction<WorkoutType | undefined>>;
    workouts: WorkoutType[];
};

const Home = ({setView, workouts, setActiveWorkout}: HomeProps) => {
    return (
        <>
            <Header />
            <div className="py-2 space-y-2">
                {workouts.map((workout) => (
                    <Workout
                        key={workout.id}
                        setView={setView}
                        workout={workout}
                        setActiveWorkout={setActiveWorkout}
                    />
                ))}
            </div>
            <AddIcon setView={setView} />
        </>
    );
};

export default Home;