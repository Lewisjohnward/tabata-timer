import { BiArrowBack } from "@/misc/icons";
import Link from "next/link";

const NotFound = () => (
                        <div className="h-[100dvh] flex flex-col items-center justify-center">
                          <div className="flex flex-col justify-center items-center gap-4">
                            <p className="text-[150px] md:text-[250px] leading-none">404</p>
                            <div className="max-w-[300px] flex flex-col items-center gap-4">
        <p>
          Sorry, we can't find that page! Don't worry though, return home using
          the button.
        </p>
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-4 bg-gray-800/50 rounded px-4 py-2 text-white shadow text-xl"
        >
          <p>Go home</p>
          <BiArrowBack className="rotate-180" />
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
