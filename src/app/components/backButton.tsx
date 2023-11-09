import Link from "next/link";
import { BiArrowBack } from "@/misc/icons";
const BackButton = () => {
  return (
    <Link
      href="/auth/login"
      className="absolute top-2 left-2 text-xl p-2 hover:bg-gray-200 rounded-full"
    >
      <BiArrowBack />
    </Link>
  );
};

export default BackButton;
