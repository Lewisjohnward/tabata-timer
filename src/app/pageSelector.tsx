"use client";
import { DragDropContext } from "react-beautiful-dnd";
import { ActiveWorkout, AddWorkout, Home } from "@/pages";
import { useTabata } from "@/hooks/useTabata";
const PageSelector = ({
  user,
  data,
}: {
  user: string | undefined;
  data: WorkoutObj[];
}) => {
  const tabata = useTabata({ data });
  const { view } = tabata;

  return (
    <DragDropContext onDragEnd={tabata.handleDragEnd}>
      {tabata.view == "home" && <Home user={user} tabata={tabata} />}

      {view == "activeworkout" && <ActiveWorkout tabata={tabata} />}

      {view == "addworkout" && <AddWorkout tabata={tabata} />}
    </DragDropContext>
  );
};
export default PageSelector;
