"use client";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = ({ title, title2 = "", href }) => {
  const router = useRouter();

  const handleBack = (event) => {
    event.preventDefault();
    router.back();
  };

  return (
    <div className="flex pt-2 items-center justify-between w-full relative">
      <div className="flex items-center gap-x-2 absolute left-0">
        <span className="text-white cursor-pointer" onClick={handleBack}>
          <ArrowLeft size={28} />
        </span>
        <h3 className="text-xl text-white font-bold ml-1">Back</h3>
      </div>

      <div className="flex-1 flex justify-center">{title && <h3 className="text-2xl text-white font-bold">{title}</h3>}</div>

      {title2 ? (
        <div className="flex items-center gap-x-4 absolute right-0">
          <h3 className="text-xl text-white font-bold">{title2}</h3>
          <Link className="text-white cursor-pointer" href={href}>
            <ArrowRight size={28} />
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
