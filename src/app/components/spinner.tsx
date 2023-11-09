import { FaSpinner } from "@/misc/icons";

export const Spinner = () => {
  return (
    <div className="w-[300px] h-[200px] flex justify-center items-center">
      <FaSpinner className="text-8xl text-sky-500 animate-spin" />
    </div>
  );
};
