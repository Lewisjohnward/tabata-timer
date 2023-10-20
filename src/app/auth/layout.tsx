import { ReactNode } from "react";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[100dvh] relative p-4 space-y-4 flex justify-center items-center bg-[url('/background.png')]">
      <Link
        href="/"
        className="absolute right-8 top-8 py-2 px-4 bg-white shadow-lg rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Home
      </Link>
      <div className="relative max-w-sm bg-white border border-black/10 px-6 md:px-10 py-10 rounded">
        {children}
      </div>
    </div>
  );
};

export default Layout;
