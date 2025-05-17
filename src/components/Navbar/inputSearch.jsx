"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const inputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    const keyword = searchRef.current?.value.trim();
    if (!keyword) return;
    router.push(`/search/${keyword}`);
  };

  return (
    <form className="relative text-black" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 rounded bg-white placeholder-gray-500 border border-gray-300 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:shadow-lg focus:shadow-white/50"
        ref={searchRef}
      />
      <button type="submit" className="absolute top-2 end-2 p-1 rounded-full hover:bg-gray-200 transition">
        <MagnifyingGlass size={20} className="text-gray-600" />
      </button>
    </form>
  );
};

export default inputSearch;
