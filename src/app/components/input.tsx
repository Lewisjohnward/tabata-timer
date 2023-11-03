import clsx from "clsx";
import { ReactNode } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "@/misc/icons";

type NumberInputProps = {
  icon: ReactNode;
  displayText: string;
  property: string;
  value: number;
  dispatch: any;
};

const NumberInput = ({
  icon,
  displayText,
  property,
  value,
  dispatch,
}: NumberInputProps) => {
  return (
    <div className="flex">
      <div className="flex justify-center items-center text-4xl pl-2">
        {icon}
      </div>
      <div className="flex-grow ml-4 space-y-2 text-center border-b-[1px] border-black pb-2">
        <label className="block font-bold">{displayText}</label>
        <div className="flex justify-between items-center">
          <button
            className="disabled:opacity-40"
            disabled={value == 0}
            onClick={() => {
              dispatch({
                type: "DECREMENT",
                payload: { key: property as keyof WorkoutObj },
              });
            }}
          >
            <AiFillMinusCircle className="text-4xl" />
          </button>
          <input
            className={clsx(
              "w-full text-center bg-transparent focus:outline-none text-xl"
            )}
            type={"text"}
            value={value}
            onChange={(e) => {
              const regex = /^[0-9\b]+$/;
              if (e.target.value === "" || regex.test(e.target.value)) {
                dispatch({
                  type: "UPDATE",
                  payload: {
                    key: property as keyof WorkoutObj,
                    value: +e.target.value,
                  },
                });
              }
            }}
          />

          <button
            onClick={() => {
              dispatch({
                type: "INCREMENT",
                payload: { key: property as keyof WorkoutObj },
              });
            }}
          >
            <AiFillPlusCircle className="text-4xl" />
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
  dispatch: React.Dispatch<any>;
};

export const TextInput = ({ icon, label, value, dispatch }: TextInputProps) => {
  return (
    <div className="flex">
      <div className="flex justify-center items-center text-4xl pl-2">
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
            onChange={(e) => {
              dispatch({
                type: "UPDATE",
                payload: { key: "title", value: e.target.value },
              });
            }}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
