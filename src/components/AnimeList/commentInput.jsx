"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentInput = ({ animeId, user_email, username, anime_title }) => {
  const [comment, setComment] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const router = useRouter();

  const handleInput = (event) => {
    setComment(event.target.value);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    const data = { animeId, user_email, comment, username, anime_title };

    const response = await fetch("/api/v1/comment", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const sendComment = await response.json();

    if (sendComment.status == 200) {
      setIsCreated(sendComment.isCreated);
      setComment("");
      router.refresh();
    }
    return;
  };

  return (
    <div className="flex flex-col px-8 gap-2 mb-14">
      {isCreated && <p className="text-white">Posting Comment Success</p>}

      <textarea
        onChange={handleInput}
        placeholder="Add a comment..."
        value={comment}
        className="w-full h-32 px-4 py-2 mb-3 text-xl rounded bg-white text-black transition-all duration-500 ease-in-out focus:border-white hover:shadow-lg focus:shadow-white/50"
        name=""
        id=""
      ></textarea>
      <button onClick={handleSend} className="w-42 rounded font-semibold py-2 px-3 bg-violet-600 transition-all duration-500 ease-in-out hover:scale-102 hover:border-violet-600 hover:shadow-lg hover:shadow-violet-600/50">
        Send Comment
      </button>
    </div>
  );
};

export default CommentInput;
