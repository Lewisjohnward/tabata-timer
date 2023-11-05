"use client";
import { SetStateAction, useEffect, useRef } from "react";
import useFilter from "@/hooks/useFilter";
import AddIcon from "@/components/addIcon";
import Header from "@/components/header";
import Workout from "@/components/workout";
import { Droppable } from "react-beautiful-dnd";
import {
  updateThemeColor,
  useUpdateHeaderColor,
} from "@/hooks/useUpdateHeaderColor";

type HomeProps = {
  user: string | undefined;
  workouts: WorkoutObj[];
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
};

const Home = ({ user, workouts, setWorkouts }: HomeProps) => {
  const { filter, dispatch, filteredWorkouts, favouriteCount, colorCount } =
    useFilter(workouts);

  const workoutsRef = useRef<HTMLDivElement>();
  const headerRef = useRef<HTMLDivElement>(null);
  const { initColor, updateColor } = useUpdateHeaderColor(
    filteredWorkouts,
    workoutsRef,
    headerRef
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
          filter={filter}
          dispatch={dispatch}
          filteredWorkouts={filteredWorkouts}
          colorCount={colorCount}
          favouriteCount={favouriteCount}
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
                key={workout.id}
                user={user}
                index={index}
                expandedWorkout={filter.expandedWorkouts}
                workout={workout}
                setWorkouts={setWorkouts}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddIcon user={user} />
    </div>
  );
};

export default Home;
