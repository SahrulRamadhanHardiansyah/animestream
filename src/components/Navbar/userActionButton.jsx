import Link from "next/link";
// import { authUserSession } from "@/libs/auth-libs";

const UserActionButton = async () => {
  // const user = await authUserSession();
  const user = null;
  const actionLabel = user ? "Sign Out" : "Sign In";
  const actionURL = user ? "/api/auth/signout" : "/api/auth/signin";

  return (
    <div className="flex justify-between items-center gap-2 md:gap-4">
      {user ? (
        <Link href="/users/dashboard" className="py-1 text-white transition-all duration-300 hover:text-gray-300">
          Dashboard
        </Link>
      ) : null}
      <Link href={actionURL} className="bg-white text-violet-700 font-bold py-2 px-4 md:px-8 rounded transition-all duration-500 ease-in-out hover:scale-105 hover:border-white hover:shadow-lg hover:shadow-white/50">
        {actionLabel}
      </Link>
    </div>
  );
};

export default UserActionButton;
