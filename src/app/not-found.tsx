import {
  GiWeightLiftingUp,
  MdSportsGymnastics,
  LiaDumbbellSolid,
  BiArrowBack,
} from "@/misc/icons";
import Link from "next/link";

const Icons = [
  <GiWeightLiftingUp />,
  <MdSportsGymnastics />,
  <LiaDumbbellSolid />,
];

const random = Icons[Math.floor(Math.random() * Icons.length)];

const NotFound = () => {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center">
      <div className="flex justify-center items-center gap-4">
        <p className="text-[250px] leading-none">404</p>
        <div className="max-w-[300px] flex flex-col items-center gap-4">
          <div className="text-[200px]">{random}</div>
          <p>
            Sorry, we can't find that page! Don't worry though, return home
            using the button.
          </p>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-4 bg-gray-800/50 rounded px-4 py-2 text-white shadow text-xl"
          >
            <p>Go home</p>
            <BiArrowBack className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
