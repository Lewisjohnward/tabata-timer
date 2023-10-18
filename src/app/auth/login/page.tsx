import Link from "next/link";
import Messages from "./messages";
import { colors } from "@/misc/colors";

const color = colors[Math.floor(Math.random() * colors.length)];

export default function Login() {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Log In</h1>
      <p className="mb-4">
        By continuing, you agree to our User Agreement and acknowledge that you
        understand the Privacy Policy.
      </p>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground [&>input]:outline-none"
        action="/api/auth/sign-in"
        method="post"
      >
        <input
          className="rounded-md px-4 py-2 border"
          id="email"
          name="email"
          placeholder="email"
          pattern=".+@.+\.com"
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
        <div className="space-y-4">
          <div className="flex">
            <p className="text-sm pr-1">New to Tabata Timer?</p>
            <Link href="/auth/signup" className="text-blue-500 text-sm">
              Sign up
            </Link>
          </div>
          <div className="flex">
            <p className="text-sm pr-1">Forgot your</p>
            <Link
              href="/auth/forgotpassword"
              className="text-blue-500 text-sm hover:underline"
            >
              password
            </Link>
            <p className="text-sm pr-1">?</p>
          </div>
        </div>
        <button
          className="px-4 py-2 mb-2 text-white font-bold rounded hover:bg-gray-500"
          style={{ backgroundColor: color }}
        >
          Sign In
        </button>
        <Messages />
      </form>
    </>
  );
}
