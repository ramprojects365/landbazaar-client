"use client";
import { useEffect, useState } from "react";

const useSticky = () => {
  const [sticky, setSticky] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > lastScrollTop && scrollTop > 200) {
        setSticky(false);
      } else if (scrollTop < lastScrollTop && scrollTop > 200) {
        setSticky(true);
      } else {
        setSticky(false);
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return { sticky };
};

export default useSticky;