"use client";
import Link from "next/link";

const NewHeader = ({ user }: { user: string | undefined }) => {
  return (
    <>
      {!user ? (
        <Link href="/login">Login</Link>
      ) : (
        <form action="/auth/sign-out" method="post">
          <button>Logout</button>
        </form>
      )}
    </>
  );
};

export default NewHeader;
