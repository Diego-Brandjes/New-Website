import { useEffect } from "react";

const useScrollAnimation = () => {
  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    elementsToAnimate.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
};

export default useScrollAnimation;