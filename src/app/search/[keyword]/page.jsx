import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/header";
import { getAnimeResponse } from "@/libs/api-libs";
import { notFound } from "next/navigation";

const Page = async ({ params }) => {
  const { keyword } = await params;
  const decodedKeyword = decodeURIComponent(keyword);

  try {
    const searchData = await getAnimeResponse("otakudesu", `search?q=${decodedKeyword}`);
    const searchAnime = searchData.data.animeList;

    if (!searchAnime || searchAnime.length === 0) {
      notFound();
    }

    return (
      <section>
        <Header title={`Search for '${decodedKeyword}'...`}/>
        <AnimeList api={searchAnime} />
      </section>
    );
  } catch (error) {
    console.error("Search error:", error);
    notFound();
  }
};

export default Page;
