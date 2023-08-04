import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import { BsFillPaletteFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

const IconArr = [
  <BsFillPaletteFill />,
  <AiOutlineStar />,
  <AiOutlineSearch />,
  <CiSettings />,
];

type Props = {
  workoutCount: number;
};

const Header = ({ workoutCount }: Props) => {
  return (
    <div className="flex justify-between gap-4 bg-gray-400 p-4 text-white font-bold">
      <div className="space-y-4">
        <h1 className="text-4xl">Workouts: {workoutCount}</h1>
        <h2 className="text-2xl">All</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 text-3xl">
        {IconArr.map((d, i) => (
          <button key={i}>{d}</button>
        ))}
      </div>
    </div>
  );
};

export default Header;
