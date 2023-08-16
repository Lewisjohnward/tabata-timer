import clsx from "clsx";
import { ReactNode } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

type NumberInputProps = {
  icon: ReactNode;
  label: string;
  minValue: number;
  value: number;
  dispatch: any;
  increment: any;
  decrement: any;
};

const NumberInput = ({
  icon,
  label,
  minValue,
  value,
  dispatch,
  increment,
  decrement,
}: NumberInputProps) => {
  const isDisabled = value == minValue;
  return (
    <div className="flex">
      <div className="flex justify-center items-center text-6xl pl-2">
        {icon}
      </div>
      <div className="flex-grow ml-4 space-y-2 text-center border-b-[1px] border-black pb-2">
        <label className="block font-bold">{label}</label>
        <div className="flex justify-between items-center">
          <button
            className="disabled:opacity-40"
            disabled={isDisabled}
            onClick={decrement}
          >
            <AiFillMinusCircle className="text-5xl" />
          </button>
          <input
            className={clsx(
              "w-full text-center bg-transparent focus:outline-none text-2xl"
            )}
            type={"number"}
            value={value}
            onChange={(e) =>
              dispatch({
                type: "update",
                payload: { key: label.toLowerCase(), value: e.target.value },
              })
            }
          />

          <button
            onClick={() =>
              dispatch({
                type: "increment",
                payload: { key: label.toLowerCase() },
              })
            }
          >
            <AiFillPlusCircle onClick={increment} className="text-5xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

type TextInputProps = {
  icon: ReactNode;
  label: string;
  value: string;
  dispatch: any;
};

export const TextInput = ({ icon, label, value, dispatch }: TextInputProps) => {
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
              "w-full pb-4 text-center bg-transparent focus:outline-none text-2xl"
            )}
            type={"text"}
            value={value}
            onChange={(e) =>
              dispatch({
                type: "update",
                payload: { key: label.toLowerCase(), value: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
