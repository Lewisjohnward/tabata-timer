"use client";
import { SetStateAction, useRef } from "react";
import useFilter from "@/hooks/useFilter";
import AddIcon from "@/components/addIcon";
import Header from "@/components/header";
import Workout from "@/components/workout";
import { Droppable } from "react-beautiful-dnd";

type HomeProps = {
  user: string | undefined;
  workouts: WorkoutObj[];
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>;
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>;
  setView: React.Dispatch<SetStateAction<string>>;
};

const Home = ({
  user,
  workouts,
  setWorkouts,
  setActiveWorkout,
  setWorkoutToEdit,
  setView,
}: HomeProps) => {
  const { filter, dispatch, filteredWorkouts, colorCount } =
    useFilter(workouts);

  const workoutsRef = useRef<HTMLDivElement>();
  const headerRef = useRef<HTMLDivElement>(null);
  console.log(filteredWorkouts);

  const initColor =
    filteredWorkouts.length != 0 ? filteredWorkouts[0].color : "#aaaaaa";

  const handleScroll = () => {
    const divs = workoutsRef.current?.children;
    const header = headerRef.current;
    const headerHeight = header?.getBoundingClientRect().bottom;
    if (!headerHeight || !divs) return;
    for (let i = 0; i < divs.length; i++) {
      const top = divs[i].getBoundingClientRect().top;
      const bottom = divs[i].getBoundingClientRect().bottom;
      if (top <= headerHeight && bottom >= headerHeight) {
        const div = divs[i].children[0] as HTMLDivElement;
        const color = div.style.backgroundColor;
        header.style.backgroundColor = color;
      }
    }
  };

  return (
    <div className="relative h-screen overflow-scroll" onScroll={handleScroll}>
      <div
        className="sticky top-0 z-50 px-2 py-2 space-y-2 bg-gray-400 lg:px-20 text-white shadow-xl"
        style={{ backgroundColor: initColor }}
        ref={headerRef}
      >
        <Header
          filter={filter}
          dispatch={dispatch}
          filteredWorkouts={filteredWorkouts}
          colorCount={colorCount}
          user={user}
        />
      </div>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <div
            className="p-1 space-y-1"
            ref={(el) => {
              provided.innerRef(el);
              workoutsRef.current = el!;
            }}
            {...provided.droppableProps}
          >
            {filteredWorkouts.map((workout, index) => (
              <Workout
                user={user}
                index={index}
                key={workout.id}
                expandedWorkout={filter.expandedWorkouts}
                setView={setView}
                workout={workout}
                setWorkouts={setWorkouts}
                setActiveWorkout={setActiveWorkout}
                setWorkoutToEdit={setWorkoutToEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddIcon setView={setView} user={user} />
    </div>
  );
};

export default Home;
