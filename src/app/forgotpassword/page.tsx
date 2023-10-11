"use client";
import AuthLayout from "@/components/authLayout";
import BackButton from "@/components/backButton";
import { useSearchParams } from "next/navigation";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <AuthLayout>
      <BackButton />
      <h1 className="text-xl font-bold my-4 ">Reset your password</h1>

      <p className="text-sm mb-4">
        Tell us the email address associated with your Tabata Timer account, and
        we’ll send you an email with a link to reset your password.
      </p>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground [&>input]:outline-none"
        action="/auth/sign-in"
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
        <button
          formAction="/auth/reset-password"
          className="bg-gray-500 rounded px-4 py-2 text-white mb-2 hover:bg-gray-500 font-bold"
        >
          Reset password
        </button>
      </form>
      {message && (
        <p className="mt-4 p-4 bg-neutral-900 text-neutral-300 text-center">
          {message}
        </p>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
