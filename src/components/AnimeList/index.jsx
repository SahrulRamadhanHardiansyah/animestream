import React from "react";
import Link from "next/link";
import Image from "next/image";

const AnimeList = ({ api }) => {
  if (!api || api.length === 0) {
    return <p className="px-12 pb-12">Tidak ada data anime.</p>;
  }

  return (
    <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8 px-12 pb-12">
      {Array.isArray(api) &&
        api.map((anime, index) => (
          <Link
            key={index}
            href={`/anime/${anime.animeId}`}
            className="cursor-pointer self-start mb-4 block rounded-lg transition-all duration-500 border border-transparent hover:text-violet-600 hover:border-violet-800 hover:shadow-lg hover:shadow-violet-800/50 box-border flex flex-col h-full"
          >
            <div className="relative w-full aspect-[2/3]">
              <Image className="rounded-md object-cover" src={anime.poster} alt={anime.title} layout="fill" objectFit="cover" />
            </div>
            <h3 className="font-bold mt-2 md:text-xl text-md p-3 min-h-[56px]">{anime.title}</h3>
            <h3 className="font-bold md:text-md text-sm pl-3 pb-3">🎬 {anime.episodes} eps</h3>
            {anime.score !== null && anime.score !== undefined && <h3 className="font-bold md:text-md text-sm pl-3 pb-3">⭐ {anime.score}</h3>}
          </Link>
        ))}
    </div>
  );
};

export default AnimeList;
