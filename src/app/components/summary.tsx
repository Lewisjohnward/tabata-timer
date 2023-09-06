import generateSummary from "../helpers/generateSummary";
import { WorkoutObj } from "../types/WorkoutObj";
import Modal from "./modal";

type SummaryProps = {
  setSummaryVisible: React.Dispatch<React.SetStateAction<boolean>>;
  workout: WorkoutObj;
  color: string;
};

const NumberOfSets = ({
  numberOfSets,
  color,
}: {
  numberOfSets: number;
  color: string;
}) => {
  return <p style={{ color: color }}>{`Number of sets: ${numberOfSets}`}</p>;
};

const Totals = ({ totals, color }: { totals: string[]; color: string }) => {
  return (
    <div style={{ color: color }}>
      {totals.map((total: string) => (
        <p key={total}>{total}</p>
      ))}
    </div>
  );
};

const IntervalsList = ({
  summary,
  color,
}: {
  summary: string[];
  color: string;
}) => {
  return (
    <div className="space-y-2">
      {summary.map((d: string) => {
        const fontColor = d.includes("Prepare")
          ? "#166534"
          : d.includes("Work")
          ? "#dc2626"
          : d.includes("Rest")
          ? "#0369a1"
          : d.includes("Rest between sets")
          ? "#0369a1"
          : d.includes("Cycle")
          ? color
          : d.includes("Set")
          ? color
          : d.includes("Cooldown")
          ? "#166534"
          : "black";

        return (
          <p key={d} style={{ color: fontColor }}>
            {d}
          </p>
        );
      })}
    </div>
  );
};

const Summary = ({ setSummaryVisible, workout, color }: SummaryProps) => {
  const { numberOfSets, totals, summary } = generateSummary(workout);

  return (
    <Modal closePortal={() => setSummaryVisible(false)}>
      <div className="w-screen h-screen flex justify-center items-center bg-black/20">
        <div className="flex flex-col items-center -mt-8 md:mt-0 bg-white h-5/6 w-11/12 md:h-5/6 md:w-3/6 lg:w-2/6 overflow-scroll rounded shadow space-y-4 lg:h-8/12 font-semibold text-lg text-center pt-4">
          <p style={{ color: color }}>Workout</p>
          {numberOfSets && (
            <NumberOfSets numberOfSets={numberOfSets} color={color} />
          )}
          <Totals totals={totals} color={color} />
          <IntervalsList summary={summary} color={color} />
        </div>
      </div>
    </Modal>
  );
};

export default Summary;
