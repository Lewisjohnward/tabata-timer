"use client";
import BackButton from "@/components/backButton";
import { useSearchParams } from "next/navigation";

const Signup = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
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
          placeholder="email"
          pattern=".+@.+\..+"
          required
        />
        <input
          className="rounded-md px-4 py-2 border"
          id="password"
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <input
          className="rounded-md px-4 py-2 border"
          id="password"
          type="password"
          name="password"
          placeholder="confirm password"
          required
        />
        <button className="bg-gray-500 rounded px-4 py-2 text-white mb-2 hover:bg-gray-500 font-bold">
          Sign up
        </button>
      </form>
      {message && (
        <p className="mt-4 p-4 bg-neutral-900 text-neutral-300 text-center">
          {message}
        </p>
      )}
    </>
  );
};

export default Signup;
