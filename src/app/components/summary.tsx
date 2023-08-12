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
  return (
    <p style={{ color: color }}>
      {numberOfSets && `Number of sets: ${numberOfSets}`}
    </p>
  );
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
          ? "#15803d"
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
          ? "#15803d"
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
      <div className="bg-white h-[500px] w-[800px] overflow-scroll rounded shadow space-y-4 lg:h-[800px] font-semibold text-lg text-center">
        <p style={{ color: color }}>Workout</p>
        <NumberOfSets numberOfSets={numberOfSets} color={color} />
        <Totals totals={totals} color={color} />
        <IntervalsList summary={summary} color={color} />
      </div>
    </Modal>
  );
};

export default Summary;
