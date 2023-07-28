import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import { BsFillPaletteFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

const IconArr = [
  <BsFillPaletteFill />,
  <AiOutlineStar />,
  <AiOutlineSearch />,
  <CiSettings />,
];

const Header = () => {
  return (
    <div className="flex justify-between gap-4 bg-gray-400 p-4 text-white font-bold shadow-[4px_2px_2px_0px_rgba(0,0,0,0.2)]">
      <div className="space-y-4">
        <h1 className="text-4xl drop-shadow-lg">Workouts: 52</h1>
        <h2 className="text-2xl drop-shadow-lg">All</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 text-3xl">
        {IconArr.map((d) => (
          <button>{d}</button>
        ))}
      </div>
    </div>
  );
};

export default Header;
