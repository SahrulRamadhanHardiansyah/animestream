import prisma from "@/libs/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const animeId = searchParams.get("animeId");
  const user_email = searchParams.get("user_email");

  if (!animeId || !user_email) {
    return Response.json({ status: 400, message: "Missing parameters" });
  }

  const collection = await prisma.collection.findFirst({
    where: {
      animeId,
      user_email,
    },
  });

  const isCreated = !!collection;

  return Response.json({ status: 200, isCreated });
}

export async function POST(request) {
  try {
    const { animeId, user_email, anime_image, anime_title } = await request.json();
    const data = { animeId, user_email, anime_image, anime_title };

    const createCollection = await prisma.collection.create({ data });

    return Response.json({ status: 200, isCreated: true, data: createCollection });
  } catch (error) {
    console.error("Error creating collection:", error);
    return Response.json({ status: 500, isCreated: false, error: error.message });
  }
}

export async function DELETE(request) {
  try {
    const { animeId, user_email } = await request.json();

    const deletedCollection = await prisma.collection.deleteMany({
      where: {
        animeId,
        user_email,
      },
    });

    if (deletedCollection.count > 0) {
      return Response.json({ status: 200, isCreated: false, deleted: true });
    } else {
      return Response.json({ status: 404, isCreated: true, deleted: false, message: "No collection found to delete" });
    }
  } catch (error) {
    console.error("Error deleting collection:", error);
    return Response.json({ status: 500, isCreated: true, error: error.message });
  }
}
