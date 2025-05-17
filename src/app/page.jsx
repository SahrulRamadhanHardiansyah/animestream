import React from "react";
import { getAnimeResponse, getNestedAnimeResponse } from "@/libs/api-libs";
import Header from "@/components/AnimeList/header";
import AnimeList from "@/components/AnimeList";
import ScrollToTopButton from "@/components/utilities/scrollToTopButton";

const page = async () => {
  const homeData = await getAnimeResponse("otakudesu", "home");

  const ongoingAnime = homeData.data.ongoing.animeList;
  const completedAnime = homeData.data.completed.animeList;

  return (
    <>
      <section>
        <Header title="Ongoing Anime" linkTitle="See All" linkHref="/ongoing" />
        <AnimeList api={ongoingAnime} />
      </section>
      <section>
        <Header title="Completed Anime" linkTitle="See All" linkHref="/completed" />
        <AnimeList api={completedAnime} />
      </section>

      <ScrollToTopButton />
    </>
  );
};

export default page;
