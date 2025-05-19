import prisma from "@/libs/prisma";

export async function POST(request) {
  try {
    const { anime_mal_id, user_email, anime_image, anime_title } = await request.json();
    const data = { anime_mal_id, user_email, anime_image, anime_title };

    const createCollection = await prisma.collection.create({ data });

    return Response.json({ status: 200, isCreated: true, data: createCollection });
  } catch (error) {
    console.error("Error creating collection:", error);
    return Response.json({ status: 500, isCreated: false, error: error.message });
  }
}
