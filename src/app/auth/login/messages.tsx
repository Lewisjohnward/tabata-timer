"use client";
import { colors } from "@/misc/colors";

const color = colors[Math.floor(Math.random() * colors.length)];

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && (
        <p
          className="p-4 bg-neutral-900 text-white font-bold text-center rounded"
          style={{ backgroundColor: color }}
        >
          {error}
        </p>
      )}
      {message && (
        <p
          className="p-4 bg-neutral-900 text-white font-bold text-center rounded"
          style={{ backgroundColor: color }}
        >
          {message}
        </p>
      )}
    </>
  );
}
