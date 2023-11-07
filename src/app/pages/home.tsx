"use client";
import { SetStateAction, useRef } from "react";
import useFilter from "@/hooks/useFilter";
import AddIcon from "@/components/addIcon";
import Header from "@/components/header";
import Workout from "@/components/workout";
import { Droppable } from "react-beautiful-dnd";
import { useHeaderColor } from "@/hooks/useUpdateHeaderColor";

type HomeProps = {
  user: string | undefined;
  workouts: WorkoutObj[];
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj | null>>;
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
  const workoutsRef = useRef<HTMLDivElement>();
  const headerRef = useRef<HTMLDivElement>(null);

  const { filterState, dispatch, filter } = useFilter(workouts);

  const { initColor, updateColor } = useHeaderColor(
    filter.filteredWorkouts,
    workoutsRef,
    headerRef,
    filterState.color
  );

  return (
    <div
      className="relative h-[100dvh] md:h-screen overflow-scroll"
      onScroll={updateColor}
    >
      <div
        className="sticky top-0 z-10 px-2 py-2 space-y-2 lg:px-20 text-white shadow-xl"
        style={{ backgroundColor: initColor }}
        ref={headerRef}
      >
        <Header
          filterState={filterState}
          dispatch={dispatch}
          filter={filter}
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
            {filter.filteredWorkouts.map((workout, index) => (
              <Workout
                user={user}
                index={index}
                key={workout.id}
                expandedWorkout={filterState.expandedWorkouts}
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
