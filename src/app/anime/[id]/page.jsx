export const dynamic = "force-dynamic";

import { getAnimeResponse } from "@/libs/api-libs";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/libs/prisma";
import { authUserSession } from "@/libs/auth-libs";
import HeaderPage from "@/components/utilities/headerPage";
import CommentBox from "@/components/AnimeList/commentBox";
import CommentInput from "@/components/AnimeList/commentInput";
import CollectionButton from "@/components/AnimeList/collectionButton";

const Page = async ({ params: paramsPromise }) => {
  // Await the params before destructuring
  const params = await paramsPromise;
  const { id } = params;

  const anime = await getAnimeResponse("otakudesu", `anime/${id}`);
  const user = await authUserSession();
  const collection = await prisma.collection.findFirst({
    where: { user_email: user?.email, animeId: id },
  });

  return (
    <div className="container mx-auto pb-10">
      {/* Header Section */}
      <div className="pt-8 px-4 md:px-8">
        <HeaderPage title={anime.data.title} year={anime.data.aired?.split(" ")[2] || ""} />
        {user && <CollectionButton animeId={id} user_email={user.email} anime_image={anime.data.poster} anime_title={anime.data.title} isCollected={!!collection} />}
      </div>

      {/* Main Content Section */}
      <div className="pt-6 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Poster & Info Cards */}
        <div className="space-y-6">
          {/* Poster */}
          <div className="rounded-lg overflow-hidden shadow-md border border-gray-700">
            <Image src={anime.data.poster} alt={anime.data.title} width={400} height={600} className="w-full object-cover" />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <InfoCard title="Japanese" content={anime.data.japanese || "N/A"} />
            <InfoCard title="Score" content={`⭐ ${anime.data.score || "N/A"}`} />
            <InfoCard title="Status" content={anime.data.status || "N/A"} />
            <InfoCard title="Episodes" content={anime.data.episodes || "Ongoing"} />
            <InfoCard title="Studios" content={anime.data.studios || "N/A"} />
            <InfoCard title="Duration" content={anime.data.duration || "N/A"} />
            <InfoCard title="Producers" content={anime.data.producers || "N/A"} className="col-span-2" />
          </div>

          {/* Genres */}
          <div className="p-4 bg-gray-800 rounded-lg shadow-md transition-all duration-300 border border-gray-700 hover:border-violet-600 hover:shadow-lg hover:shadow-violet-800/20">
            <h3 className="text-lg font-semibold mb-2 text-white">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {anime.data.genreList?.map((genre, index) => (
                <Link key={index} href={genre.href} className="px-3 py-1 bg-violet-700 text-white text-sm rounded-full hover:bg-violet-600 transition-all duration-300">
                  {genre.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Middle & Right - Synopsis, Episodes & Stream */}
        <div className="md:col-span-2 space-y-6">
          {/* Synopsis */}
          <div className="p-5 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-white underline">Synopsis</h3>
            {anime.data.synopsis?.paragraphs && anime.data.synopsis.paragraphs.length > 0 ? (
              <p className="text-justify text-gray-200">{anime.data.synopsis.paragraphs.join("\n\n")}</p>
            ) : (
              <p className="text-gray-300 italic">No synopsis available.</p>
            )}
          </div>

          {/* Episode List */}
          <div className="p-5 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-white">Episode List</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {anime.data.episodeList?.map((episode, index) => (
                <Link key={index} href={episode.href} className="p-3 bg-violet-700 rounded cursor-pointer transition-all duration-500 ease-in-out hover:scale-102 hover:border-violet-600 hover:shadow-lg hover:shadow-violet-600/50">
                  Episode {episode.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Streaming Section */}
          <div className="p-5 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-white">Streaming</h3>
            {anime.data.episodeList && anime.data.episodeList.length > 0 ? (
              <div className="space-y-4">
                <p className="text-gray-200">Pilih episode di atas untuk mulai streaming.</p>
                <div className="p-4 border border-dashed border-gray-600 rounded-lg text-center">
                  <p className="text-gray-300">Stream player akan muncul saat episode dipilih.</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-300 italic">No episodes available for streaming.</p>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-2 mt-14">
        <h3 className="text-2xl font-bold mb-6">Comment</h3>
        <CommentBox animeId={id} />
        {user && <CommentInput animeId={id} user_email={user?.email} username={user?.name} anime_title={anime.data.title} />}
      </div>

      {/* Recommendations Section */}
      <div className="pt-8 px-4 md:px-8">
        <h3 className="text-2xl font-bold mb-4">Anime Recommendations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {anime.data.recommendedAnimeList?.map((recommendation, index) => (
            <Link
              key={index}
              href={`/anime/${recommendation.animeId}`}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:scale-102 hover:border-violet-600 hover:shadow-lg hover:shadow-violet-800/20  transition-all duration-300"
            >
              <div className="relative h-80">
                <Image src={recommendation.poster} alt={recommendation.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm line-clamp-2">{recommendation.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Komponen InfoCard untuk menampilkan informasi
const InfoCard = ({ title, content, className = "" }) => (
  <div className={`p-3 flex flex-col justify-center items-center rounded-lg bg-gray-800 shadow-md transition-all duration-300 border border-gray-700 hover:border-violet-600 hover:shadow-lg hover:shadow-violet-800/20 ${className}`}>
    <h3 className="whitespace-nowrap text-sm font-medium text-gray-300">{title}</h3>
    <p className="text-center font-semibold">{content}</p>
  </div>
);

export default Page;
