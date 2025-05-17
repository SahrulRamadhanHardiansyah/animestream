import Link from "next/link";

const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="p-4 px-14 mt-6 mb-4 flex justify-between items-center">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">{title}</h1>

      {linkHref && linkTitle ? (
        <Link href={linkHref} className="text-sm sm:text-md md:text-lg underline hover:text-violet-700 transition-all">
          {linkTitle}{" "}
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
