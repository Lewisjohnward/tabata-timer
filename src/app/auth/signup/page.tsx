"use client";
import BackButton from "@/components/backButton";
import { ChangeEvent } from "react";
import { create } from "zustand";

type Store = {
  email: string;
  password: string;
  confirmPassword: string;
  modifyField: (field: string, value: string) => void;
};

const useStore = create<Store>()((set) => ({
  email: "",
  password: "",
  confirmPassword: "",
  modifyField: (field, value) => set(() => ({ [field]: value })),
}));

const Signup = () => {
  const { email, password, confirmPassword, modifyField } = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    modifyField(name, e.target.value);
  };

  return (
    <>
      <BackButton />
      <h1 className="text-xl font-bold mt-4 mb-4">Sign up</h1>
      <p className="mb-4">
        By continuing, you agree to our User Agreement and acknowledge that you
        understand the Privacy Policy.
      </p>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground [&>input]:outline-none"
        action="/auth/sign-up"
        method="post"
      >
        <input
          className="rounded-md px-4 py-2 border"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="email"
          pattern=".+@.+\..+"
          required
        />
        <div>
          <input
            className="w-full rounded-md px-4 py-2 border"
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
            name="password"
            placeholder="password"
            required
          />
          <p className="text-xs text-gray-600">
            Minimum 8 characters in length
          </p>
        </div>
        <div>
          <input
            className="w-full rounded-md px-4 py-2 border"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            placeholder="confirm password"
            required
          />
          <p className="text-xs text-gray-600">
            Minimum 8 characters in length
          </p>
        </div>
        <button className="bg-gray-500 rounded px-4 py-2 text-white mb-2 hover:bg-gray-500 font-bold">
          Sign up
        </button>
      </form>
    </>
  );
};

export default Signup;
