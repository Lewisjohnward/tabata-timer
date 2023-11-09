"use client";
import { DragDropContext } from "react-beautiful-dnd";
import { ActiveWorkout, AddWorkout, Home } from "@/pages";
import { useTabata } from "@/hooks/useTabata";

type Props = {
  user: string | undefined;
  data: WorkoutObj[];
};

const PageSelector = ({ user, data }: Props) => {
  const tabata = useTabata({ data });

  return (
    <DragDropContext onDragEnd={tabata.handleDragEnd}>
      {tabata.view == "home" && <Home user={user} tabata={tabata} />}
      {tabata.view == "activeworkout" && <ActiveWorkout tabata={tabata} />}
      {tabata.view == "addworkout" && <AddWorkout tabata={tabata} />}
    </DragDropContext>
  );
};
export default PageSelector;
