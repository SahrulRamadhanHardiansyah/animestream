"use client";

import AnimeList from "@/components/AnimeList";
import Header from "@/components/Dashboard/header";
import Pagination from "@/components/utilities/pagination";
import ScrollToTopButton from "@/components/utilities/scrollToTopButton";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/libs/api-libs";

const Ongoing = () => {
  const [page, setPage] = useState(1);
  const [completedAnime, setCompletedAnime] = useState({ data: [], pagination: {} });

  const fetchData = async () => {
    const data = await getAnimeResponse("otakudesu", `completed?page=${page}`);

    setCompletedAnime(data);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <div className="p-8">
        <Header title={`Completed Anime #${page}`} />
      </div>
      <AnimeList api={completedAnime.data.animeList} />
      <Pagination page={page} lastPage={completedAnime.pagination?.last_visible_page} setPage={setPage} />
      <ScrollToTopButton />
    </>
  );
};

export default Ongoing;
