"use client";
import {
  useReducer,
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { resetPasswordStore } from "../store/credentialsStore";
import { colors } from "@/misc/colors";
import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";
const color = colors[Math.floor(Math.random() * colors.length)];

interface FormData {
  password: { value: string };
}

const initPasswordState = {
  passwordA: "",
  passwordB: "",
  passwordValidated: false,
  passwordsMatch: false,
};

const reducer = (passwordState: any, action: any) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...passwordState,
        [action.payload.key]: action.payload.value,
        passwordValidated: action.payload.value.length >= 8,
        passwordsMatch: passwordState.passwordA == action.payload.value,
      };
    default:
      return passwordState;
  }
};

const Page = () => {
  const [passwordState, dispatch] = useReducer(reducer, initPasswordState);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const {
    password,
    confirmPassword,
    modifyField,
    passwordValidated,
    passwordsValidated,
    user,
    getUser,
    updatePassword,
    loading,
    toggleLoading,
  } = resetPasswordStore();

  const handleUpdatePassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      password: { value: string };
    };
    const password = target.password.value;

    try {
      toggleLoading();
      updatePassword(password);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    toggleLoading();
    getUser();
  }, []);

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    modifyField(e.target.name, e.target.value);
  };

  return (
    <>
      {user && !loading && (
        <>
          <h1 className="text-xl font-bold my-4 text-center">
            Reset your password
          </h1>
          <p className="text-sm mb-4 text-center">Enter new password</p>
          <form
            className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground [&>input]:outline-none"
            onSubmit={handleUpdatePassword}
          >
            <div className="space-y-2">
              <input
                className="rounded-md px-4 py-2 border focus:outline focus:outline-2 focus:invalid:outline-red-500 focus:valid:outline-green-500"
                type="password"
                id="password"
                name="password"
                placeholder="password"
                pattern=".{8,}"
                onChange={handleChange}
                value={password}
                required
              />
              <p className="text-xs text-gray-600">
                Minimum 8 characters in length
              </p>
            </div>
            <div className="space-y-2">
              <input
                className={clsx(
                  "rounded-md px-4 py-2 border focus:outline focus:outline-2 focus:invalid:outline-red-500",
                  !passwordValidated
                    ? "focus:valid:outline-green-500"
                    : "focus:valid:outline-red-500"
                )}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirm password"
                pattern=".{8,}"
                onChange={handleChange}
                value={confirmPassword}
                required
              />
              <p className="text-xs text-gray-600">
                Minimum 8 characters in length
              </p>
            </div>
            <button
              className="px-4 py-2 mb-2 text-white font-bold rounded hover:bg-gray-500 disabled:text-opacity-50"
              disabled={!passwordsValidated()}
              style={{ backgroundColor: color }}
            >
              Reset password
            </button>
          </form>
        </>
      )}
      {loading && (
        <div className="w-[300px] h-[200px] flex justify-center items-center">
          <FaSpinner className="text-8xl text-sky-500 animate-spin" />
        </div>
      )}
    </>
  );
};

export default Page;
