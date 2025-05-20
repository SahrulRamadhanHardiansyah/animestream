import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import Header from "@/components/Dashboard/header";
import Link from "next/link";

const Page = async () => {
  const user = await authUserSession();
  const comments = await prisma.comment.findMany({
    where: { user_email: user.email },
  });

  return (
    <div className="mt-6 px-6 w-full">
      <Header title={"My Anime Comment"} />
      <div className="grid grid-cols-1 gap-4 mt-6">
        {comments.map((comment) => {
          return (
            <Link href={`/anime/${comment.animeId}`} className="bg-white rounded text-black px-4 py-2 transition-all duration-500 ease-in-out hover:scale-101 hover:border-white hover:shadow-lg hover:shadow-white/30" key={comment.id}>
              <p className="font-semibold">{comment.anime_title}</p>
              <p>{comment.comment}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
