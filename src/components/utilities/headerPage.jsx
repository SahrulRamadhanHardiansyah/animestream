"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

const HeaderPage = ({ title = "", year = "" }) => {
  const router = useRouter();

  const handleBack = (event) => {
    event.preventDefault();
    router.back();
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-white cursor-pointer" onClick={handleBack}>
        <ArrowLeft size={28} />
      </span>
      <h3 className="text-2xl font-bold text-white ml-4">
        {title} {year && `- ${year}`}
      </h3>
    </div>
  );
};

export default HeaderPage;
