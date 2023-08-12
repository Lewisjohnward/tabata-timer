import Modal from "./modal";
type SummaryProps = {
  setSummaryVisible: React.Dispatch<React.SetStateAction<boolean>>;
  summaryObj: any;
  color: string;
};

const NumberOfSets = ({
  numberOfSets,
  color,
}: {
  numberOfSets: string;
  color: string;
}) => {
  return <p style={{ color: color }}>{`Number of sets: ${numberOfSets}`}</p>;
};

const Totals = ({ totals, color }: { totals: string[]; color: string }) => {
  return (
    <div style={{ color: color }}>
      {totals.map((total: string) => (
        <p>{total}</p>
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

        return <p style={{ color: fontColor }}>{d}</p>;
      })}
    </div>
  );
};

const Summary = ({ setSummaryVisible, summaryObj, color }: SummaryProps) => {
  const { numberOfSets, totals, summary } = summaryObj;

  return (
    <Modal closePortal={() => setSummaryVisible(false)}>
      <div className="flex flex-col items-center bg-white h-5/6 w-5/6 md:w-3/6 lg:w-2/6 overflow-scroll rounded shadow space-y-4 lg:h-[800px] font-semibold text-lg text-center pt-4">
        <p style={{ color: color }}>Workout</p>
        {numberOfSets && (
          <NumberOfSets numberOfSets={numberOfSets} color={color} />
        )}
        <Totals totals={totals} color={color} />
        <IntervalsList summary={summary} color={color} />
      </div>
    </Modal>
  );
};

export default Summary;
