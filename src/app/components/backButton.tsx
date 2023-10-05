import { BiArrowBack } from "@/misc/icons";
import Link from "next/link";
const BackButton = () => {
  return (
    <Link
      href="/login"
      className="absolute top-2 left-2 text-xl p-2 hover:bg-gray-200 rounded-full"
    >
      <BiArrowBack />
    </Link>
  );
};

export default BackButton;
