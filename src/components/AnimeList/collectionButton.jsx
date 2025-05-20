"use client";

import { useState, useEffect } from "react";
import { BookmarkSimple } from "@phosphor-icons/react";

const CollectionButton = ({ animeId, user_email, anime_image, anime_title }) => {
  const [isCreated, setIsCreated] = useState(false);
  console.log("user_email:", user_email);

  useEffect(() => {
    if (!animeId || !user_email) return;

    const checkCollectionStatus = async () => {
      const res = await fetch(`/api/v1/collection?animeId=${animeId}&user_email=${user_email}`);
      const data = await res.json();

      if (res.ok && data.status === 200) {
        setIsCreated(data.isCreated);
      }
    };

    checkCollectionStatus();
  }, [animeId, user_email]);

  const handleCollection = async (event) => {
    event.preventDefault();

    const bodyData = { animeId, user_email, anime_image, anime_title };

    const response = await fetch("/api/v1/collection", {
      method: isCreated ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const result = await response.json();

    if (response.ok && result.status === 200) {
      setIsCreated(result.isCreated);
    } else {
      console.error("Failed to update collection status", result);
    }
  };

  return (
    <button
      onClick={handleCollection}
      className="flex items-center gap-2 px-4 py-3 mt-4 font-bold bg-violet-700 rounded cursor-pointer transition-all duration-500 ease-in-out hover:scale-102 hover:border-violet-600 hover:shadow-lg hover:shadow-violet-600/50"
    >
      <BookmarkSimple size={24} color="#ffffff" weight={isCreated ? "fill" : "regular"} />
      {isCreated ? "Added To Collection" : "Add To Collection"}
    </button>
  );
};

export default CollectionButton;
