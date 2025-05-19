import { authUserSession } from "@/libs/auth-libs";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const user = await authUserSession();

  return (
    <div className="mt-8 text-white flex flex-col justify-center items-center">
      <h5 className="text-2xl font-bold">Welcome, {user?.name}</h5>
      <Image className="mt-6 rounded-full transition-all duration-800 ease-in-out hover:border-violet-600 hover:shadow-lg hover:shadow-violet-600/50" src={user?.image} alt="..." width={250} height={250} />
      <div className="flex flex-wrap gap-4 py-8">
        <Link className="px-6 py-2 font-bold rounded bg-violet-700 transition-all duration-500 ease-in-out hover:scale-102 hover:border-violet-600 hover:shadow-lg hover:shadow-violet-600/50" href="/users/dashboard/collection">
          My Collection
        </Link>
        <Link className="px-6 py-2 font-bold rounded bg-violet-700 transition-all duration-500 ease-in-out hover:scale-102 hover:border-violet-600 hover:shadow-lg hover:shadow-violet-600/50" href="/users/dashboard/comment">
          My Comment
        </Link>
      </div>
    </div>
  );
};

export default Page;
