import { BsFillPlayFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { HomeProps } from "../components/types";
import AddIcon from "../components/addIcon";
import Header from "../components/header";
import { SetStateAction } from "react";

const Home = ({ setView }: HomeProps) => {
  return (
    <>
      <Header />
      <div className="py-2 space-y-2">
        <Workout setView={setView} />
      </div>
      <AddIcon setView={setView} />
    </>
  );
};

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
};

const Workout = ({ setView }: Props) => {
  const name = "Pigeon";
  const time = "05:59";
  const intervals = 8;

  return (
    <div className="flex space-between p-4 bg-red-500 text-white shadow-[4px_2px_2px_0px_rgba(0,0,0,0.2)]">
      <div>
        <h3 className="font-bold text-xl">{name}</h3>
        <p className="text-lg">
          {time} {intervals} intervals
        </p>
      </div>
      <div className="flex-grow flex justify-end gap-4 text-2xl [&>button]:text-4xl">
        <button>
          <BsFillPlayFill onClick={() => setView("workout")} />
        </button>
        <button>
          <FaEllipsisV />
        </button>
      </div>
    </div>
  );
};

export default Home;
