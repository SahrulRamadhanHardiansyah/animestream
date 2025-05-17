"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "@phosphor-icons/react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 bg-violet-600 p-3 rounded-full shadow-lg transition-all duration-500 ease-in-out hover:scale-102 hover:border-violet-600 hover:shadow-lg hover:shadow-violet-600/50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp size={28} className="text-white" />
    </button>
  );
};

export default ScrollToTopButton;
