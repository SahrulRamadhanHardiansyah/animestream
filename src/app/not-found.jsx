"use client";

import { Warning } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleBack = (event) => {
    event.preventDefault();
    router.back();
  };

  return (
    <div className="min-h-screen max-w-xl mx-auto flex flex-col justify-center items-center text-center">
      <Warning size={64} className="text-red-600 mb-4" />
      <h2 className="text-2xl font-bold">404 Page Not Found</h2>
      <button onClick={handleBack} className="mt-6 font-bold text-xl hover:text-violet-700 transition-all underline">
        Return
      </button>
    </div>
  );
};

export default NotFound;
