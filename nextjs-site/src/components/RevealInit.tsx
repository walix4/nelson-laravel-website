"use client";
import { useEffect } from "react";

export default function RevealInit() {
  useEffect(() => {
    const SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-scale";
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          } else {
            e.target.classList.remove("in");
          }
        });
      },
      { threshold: 0.10 }
    );
    document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
