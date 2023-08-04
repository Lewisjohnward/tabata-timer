import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";

const IconArr = [<AiOutlineSearch />, <AiOutlineMenu />, <CiSettings />];

type Props = {
  workoutCount: number;
};

const Header = ({ workoutCount }: Props) => {
  return (
    <div className="flex justify-between gap-4 bg-gray-400 p-4 text-white font-bold">
      <div className="space-y-4">
        <h1 className="text-4xl">Workouts: {workoutCount}</h1>
      </div>
      <div className="flex gap-4 text-3xl">
        {IconArr.map((d, i) => (
          <button key={i} className="hover:text-white/40">
            {d}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
