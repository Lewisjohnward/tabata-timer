"use client";
import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import useFilter from "@/hooks/useFilter";
import AddIcon from "@/components/addIcon";
import Header from "@/components/header";
import Workout from "@/components/workout";
import { useHeaderColor } from "@/hooks/useUpdateHeaderColor";
import { FaArrowUp } from "@/misc/icons";
type HomeProps = {
  user: string | undefined;
  tabata: Tabata;
};

const Home = ({ user, tabata }: HomeProps) => {
  const workoutsRef = useRef<HTMLDivElement>();
  const headerRef = useRef<HTMLDivElement>(null);

  /////
  const containerRef = useRef<HTMLDivElement>(null);
  const btnReturnToTopRef = useRef<HTMLButtonElement>(null);

  const handleScrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  /////

  const { filterState, dispatch, filter } = useFilter(tabata.workouts);

  const { initColor, updateColor } = useHeaderColor(
    filter.filteredWorkouts,
    workoutsRef,
    headerRef,
    filterState.color,
    btnReturnToTopRef
  );

  return (
    <div
      className="relative h-[100dvh] md:h-screen overflow-scroll"
      onScroll={updateColor}
      ref={containerRef}
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
                tabata={tabata}
                workout={workout}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddIcon setView={tabata.setView} user={user} />
      <button
        className="fixed bottom-2 left-5 p-3 rounded-full shadow-[1px_1px_1px_0px_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: initColor }}
        onClick={handleScrollToTop}
        ref={btnReturnToTopRef}
      >
        <FaArrowUp className="text-white" size={30} />
      </button>
    </div>
  );
};

export default Home;
