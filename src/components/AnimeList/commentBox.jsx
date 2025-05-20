import prisma from "@/libs/prisma";
import { comment } from "postcss";

const CommentBox = async ({ animeId }) => {
  const comments = await prisma.comment.findMany({
    where: { animeId },
  });

  return (
    <div className="grid grid-cols-4 gap-4 mb-4 px-8">
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="text-black px-4 py-2 rounded bg-white transition-all duration-500 ease-in-out hover:scale-101 hover:border-white hover:shadow-lg hover:shadow-white/30">
            <p className="font-semibold">{comment.username}</p>
            <p>{comment.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentBox;
