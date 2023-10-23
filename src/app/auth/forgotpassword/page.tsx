"use client";
import { AiOutlineMail, BiArrowBack, FaSpinner } from "@/misc/icons";
import { useState } from "react";

import { colors } from "@/misc/colors";
import BackButton from "@/components/backButton";
import { useForgotPasswordStore } from "../store/credentialsStore";

const random = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const ForgotPassword = () => {
  const { email, modify, sendResetEmail, loading, success, toggle } =
    useForgotPasswordStore();

  const handleRetry = () => {
    toggle("success");
  };

  return (
    <>
      <div className="min-w-[280px]">
        <BackButton />
        {success && (
          <>
            <button
              className="absolute top-2 left-2 text-xl p-2 hover:bg-gray-200 rounded-full"
              onClick={handleRetry}
            >
              <BiArrowBack />
            </button>
            <div className="flex flex-col items-center text-center space-y-20">
              <div className="flex flex-col items-center space-y-4">
                <AiOutlineMail className="text-4xl" />
                <h2 className="font-bold text-2xl">Check your inbox</h2>
                <p>
                  You'll get a password reset email if the address you have
                  provided has been verified.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm">
                  Didn't receive an email? Check your spam folder or
                </p>
                <button
                  className="px-4 py-1 rounded-lg text-white"
                  style={{ backgroundColor: random(colors) }}
                  onClick={handleRetry}
                >
                  Try Another Email
                </button>
              </div>
            </div>
          </>
        )}{" "}
        {!success && !loading && (
          <>
            <h1 className="text-xl font-bold my-4 ">Reset your password</h1>
            <p className="text-sm mb-4">
              Tell us the email address associated with your Tabata Timer
              account, and we’ll send you an email with a link to reset your
              password.
            </p>
            <form
              className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground [&>input]:outline-none"
              onSubmit={sendResetEmail}
            >
              <input
                className="rounded-md px-4 py-2 border"
                id="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={modify}
                pattern=".+@.+\.com"
                required
              />
              <button
                className="px-4 py-2 mb-2 text-white font-bold rounded hover:bg-gray-500"
                style={{ backgroundColor: random(colors) }}
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
      </div>
    </>
  );
};

export default ForgotPassword;
