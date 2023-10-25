"use client";
import { useEffect, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useResetPasswordStore } from "../store/credentialsStore";
import clsx from "clsx";
import { Spinner } from "@/components/spinner";

const Page = () => {
  const router = useRouter();
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
  } = useResetPasswordStore();

  const handleUpdatePassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    toggleLoading();
    updatePassword(e);
    router.push("/");
  };

  useEffect(() => {
    toggleLoading();
    getUser();
  }, []);

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user]);

  switch (loading) {
    case true:
      return <Spinner />;
    default:
      return (
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
                onChange={modifyField}
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
                onChange={modifyField}
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
              style={{ backgroundColor: "#ea580c" }}
            >
              Reset password
            </button>
          </form>
        </>
      );
  }
};

export default Page;
