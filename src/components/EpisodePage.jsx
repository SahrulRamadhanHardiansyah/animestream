"use client";

import { useState, useEffect } from "react";
import { getAnimeResponse } from "@/libs/api-libs";
import HeaderPage from "@/components/utilities/headerPage";
import { useParams } from "next/navigation";
import { X } from "lucide-react";

const EpisodePage = () => {
  const params = useParams();
  const id = params?.id;
  const safeId = id || "ennshbti-s3-episode-1-sub-indo";

  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [selectedStreamingUrl, setSelectedStreamingUrl] = useState(null);
  const [showEpisodeList, setShowEpisodeList] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);

  console.log("Episode ID yang dikirim:", id);
  console.log("params:", params);
  console.log("episode data:", episode);
  console.log("defaultStreamingUrl:", episode?.defaultStreamingUrl);

  // Fungsi getSelectedServer didefinisikan dulu, baru dipanggil
  const getSelectedServer = () => {
    if (!episode || !episode.server || !episode.server.qualities) return null;

    const qualityGroup = episode.server.qualities.find((q) => q.title === selectedQuality);
    if (qualityGroup && qualityGroup.serverList && qualityGroup.serverList.length > 0) {
      return qualityGroup.serverList[0]; // Default to first server
    }
    return null;
  };

  useEffect(() => {
    if (!id) return;

    const fetchEpisodeData = async () => {
      setLoading(true);
      try {
        const episodeData = await getAnimeResponse("otakudesu", "episode", params?.id);
        console.log("episodeData", episodeData);

        setEpisode(episodeData.data);

        // Misal episodeData.data ada properti episodeList,
        // kalau tidak ada, kamu bisa fetch episode list terpisah dari API lain
        if (episodeData.data?.episodeList) {
          setEpisodeList(episodeData.data.episodeList);
        }
        // Set default kualitas video kalau ada
        if (episodeData.data?.server?.qualities?.length > 0) {
          setSelectedQuality(episodeData.data.server.qualities[0].title);
        }
      } catch (error) {
        console.error("Error fetching episode data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeData();
  }, [id]);

  if (!id) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <p>Loading ID...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Episode tidak ditemukan</div>
      </div>
    );
  }

  const selectedServer = getSelectedServer();

  return (
    <div className="container mx-auto pb-10">
      {/* Header Section */}
      <div className="pt-8 px-4 md:px-8">
        <HeaderPage title={episode.title} />
      </div>

      {/* Player Section */}
      <div className="pt-6 px-4 md:px-8">
        <div className="bg-gray-800 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-white">Video Player</h3>

          {/* Streaming Player */}
          <div className="aspect-video w-full mb-6 bg-black rounded-lg overflow-hidden">
            {episode.defaultStreamingUrl ? (
              <iframe src={selectedStreamingUrl || episode.defaultStreamingUrl} className="w-full h-full" allowFullScreen title={episode.title} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <p className="text-gray-400">Video tidak tersedia</p>
              </div>
            )}
          </div>

          {/* Video Quality Options */}
          {episode.server?.qualities?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-white">Kualitas Video</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {episode.server.qualities.map((quality, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedQuality(quality.title)}
                    className={`px-4 py-2 transition rounded-md ${selectedQuality === quality.title ? "bg-violet-700 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
                  >
                    {quality.title}
                  </button>
                ))}
              </div>

              {/* Server list for selected quality */}
              {selectedQuality && (
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Server</h4>
                  <div className="flex flex-wrap gap-2">
                    {episode.server.qualities
                      .find((q) => q.title === selectedQuality)
                      ?.serverList.map((server, index) => (
                        <button
                          key={index}
                          onClick={async () => {
                            try {
                              const fullUrl = `http://localhost:3001${server.href}`;
                              const res = await fetch(fullUrl);
                              const contentType = res.headers.get("content-type");

                              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                              if (!contentType || !contentType.includes("application/json")) {
                                const text = await res.text();
                                console.error("Bukan JSON. Ini isi respons:", text);
                                return;
                              }

                              const json = await res.json();
                              if (json.ok && json.data?.url) {
                                setSelectedStreamingUrl(json.data.url);
                              } else {
                                console.error("Gagal mengambil URL video:", json.message);
                              }
                            } catch (err) {
                              console.error("Error fetching server URL:", err);
                            }
                          }}
                          className="px-4 py-2 bg-violet-700 hover:bg-violet-600 transition rounded-md text-white"
                        >
                          {server.title}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Download Links */}
          {episode.downloadUrl?.qualities?.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">Download Links</h4>
              <div className="space-y-4">
                {episode.downloadUrl.qualities.map((quality, qualityIndex) => (
                  <div key={qualityIndex} id={`quality-${qualityIndex}`} className="p-3 bg-gray-700 rounded-md">
                    <h5 className="text-white font-medium mb-2">
                      {quality.title} ({quality.size})
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {quality.urls.map((downloadLink, linkIndex) => (
                        <a key={linkIndex} href={downloadLink.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-gray-600 hover:bg-gray-500 transition rounded-md text-white text-center">
                          {downloadLink.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Episode Navigation */}
      <div className="pt-6 px-4 md:px-8">
        <div className="bg-gray-800 p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-white">Episode Lainnya</h3>

          <div className="flex justify-between items-center">
            {episode.hasPrevEpisode && episode.prevEpisode ? (
              <a href={`/otakudesu/episode/${episode.prevEpisode.episodeId}`} className="px-4 py-2 bg-violet-700 hover:bg-violet-600 transition rounded-md text-white">
                Episode Sebelumnya
              </a>
            ) : (
              <button disabled className="px-4 py-2 bg-gray-600 cursor-not-allowed rounded-md text-gray-300">
                Episode Sebelumnya
              </button>
            )}

            <button onClick={() => setShowEpisodeList(true)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition rounded-md text-white">
              Daftar Episode
            </button>

            {episode.hasNextEpisode && episode.nextEpisode ? (
              <a href={`/otakudesu/episode/${episode.nextEpisode.episodeId}`} className="px-4 py-2 bg-violet-700 hover:bg-violet-600 transition rounded-md text-white">
                Episode Selanjutnya
              </a>
            ) : (
              <button disabled className="px-4 py-2 bg-gray-600 cursor-not-allowed rounded-md text-gray-300">
                Episode Selanjutnya
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Episode List Dialog */}
      {showEpisodeList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={() => setShowEpisodeList(false)}>
              <X size={24} />
            </button>

            <h4 className="text-xl font-semibold mb-4 text-white">Daftar Episode</h4>
            {episodeList.length === 0 ? (
              <p className="text-gray-400">Episode list belum tersedia.</p>
            ) : (
              <ul className="space-y-2">
                {episodeList.map((ep) => (
                  <li key={ep.episodeId}>
                    <a href={`/otakudesu/episode/${ep.episodeId}`} className="block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white" onClick={() => setShowEpisodeList(false)}>
                      {ep.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodePage;
