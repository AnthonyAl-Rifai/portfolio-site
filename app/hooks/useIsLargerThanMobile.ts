import { useState, useLayoutEffect } from "react";

export function useIsLargerThanMobile() {
  const [isLargerThanMobile, setIsLargerThanMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false
  );

  useLayoutEffect(() => {
    const check = () =>
      setIsLargerThanMobile(window.matchMedia("(min-width: 768px)").matches);

    check(); // run once in case it changed before layout effect
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isLargerThanMobile;
}
