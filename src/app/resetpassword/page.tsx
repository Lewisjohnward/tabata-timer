"use client";
import { colors } from "@/misc/colors";
import AuthLayout from "@/components/authLayout";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent } from "react";

const color = colors[Math.floor(Math.random() * colors.length)];

interface FormData {
  password: { value: string };
}

const Page = () => {
  const supabase = createClientComponentClient();

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    console.log("reseting password");
    const { password } = e.target as typeof e.target & FormData;
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({
      password: password.value,
    });
    console.log(error);
  };

  return (
    <AuthLayout>
      <h1 className="text-xl font-bold my-4 text-center">
        Reset your password
      </h1>
      <p className="text-sm mb-4 text-center">Enter new password</p>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground [&>input]:outline-none"
        onSubmit={handleUpdatePassword}
      >
        <input
          className="rounded-md px-4 py-2 border"
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required
        />
        <button
          className="px-4 py-2 mb-2 text-white font-bold rounded hover:bg-gray-500"
          style={{ backgroundColor: color }}
        >
          Reset password
        </button>
      </form>
    </AuthLayout>
  );
};

export default Page;
