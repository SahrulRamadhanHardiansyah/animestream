import prisma from "@/libs/prisma";

export async function POST(request) {
  const { animeId, user_email, comment, username, anime_title } = await request.json();
  const data = { animeId, user_email, comment, username, anime_title };

  const createComment = await prisma.comment.create({ data });

  if (!createComment) {
    return Response.json({ status: 500, isCreated: false });
  } else {
    return Response.json({ status: 200, isCreated: true });
  }
}
