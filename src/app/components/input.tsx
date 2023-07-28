import clsx from "clsx";
import { ReactNode } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

type NumberInputProps = {
  inputType: string;
  icon: ReactNode;
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const NumberInput = ({
  inputType,
  icon,
  label,
  value,
  setValue,
}: NumberInputProps) => {
  return (
    <div className="flex">
      <div className="flex justify-center items-center text-6xl pl-2">
        {icon}
      </div>
      <div className="flex-grow ml-4 space-y-2 text-center border-b-[1px] border-black pb-2">
        <label className="block font-bold">{label}</label>
        <div className="flex justify-between items-center">
          {inputType == "number" && (
            <button onClick={() => setValue((prev) => prev - 1)}>
              <AiFillMinusCircle className="text-5xl" />
            </button>
          )}
          <input
            className={clsx(
              "w-full text-center bg-transparent focus:outline-none text-2xl",
              inputType == "text" && "pb-4"
            )}
            type={inputType}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />

          {inputType == "number" && (
            <button>
              <AiFillPlusCircle className="text-5xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

type TextInputProps = {
  inputType: string;
  icon: ReactNode;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const TextInput = ({
  inputType,
  icon,
  label,
  value,
  setValue,
}: TextInputProps) => {
  return (
    <div className="flex">
      <div className="flex justify-center items-center text-6xl pl-2">
        {icon}
      </div>
      <div className="flex-grow ml-4 space-y-2 text-center border-b-[1px] border-black pb-2">
        <label className="block font-bold">{label}</label>
        <div className="flex justify-between items-center">
          <input
            className={clsx(
              "w-full text-center bg-transparent focus:outline-none text-2xl",
              inputType == "text" && "pb-4"
            )}
            type={inputType}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
