import Link from "next/link";
import { BiArrowBack } from "@/misc/icons";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center gap-4 justify-center w-full bg-red-50">
        <Link href="/">
          <BiArrowBack />
        </Link>

        <h1>Settings</h1>
      </div>
      <h2>Timer</h2>
      <div className="bg-red-50">
        <h2>Default values</h2>
        <p>Prepare: 10 sec</p>
        <p>Work: 20 sec</p>
        <p>Rest: 10 sec</p>
        <p>Cycles: 8</p>
        <p>Sets: 8</p>
        <p>Rest between sets: 10 sec</p>
        <p>Cool down: 10 sec</p>
      </div>
      <div className="bg-gray-200 h-[1px] w-full"></div>
    </div>
  );
};

export default Page;
