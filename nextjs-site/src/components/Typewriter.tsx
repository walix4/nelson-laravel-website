"use client";
import { useState, useEffect } from "react";

// Loops a "write" (typewriter) animation: types the text, holds, erases, repeats.
export default function Typewriter({ text, className }: { text: string; className?: string }) {
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState<"typing" | "hold" | "deleting" | "wait">("typing");

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (n < text.length) t = setTimeout(() => setN(n + 1), 42);
      else t = setTimeout(() => setPhase("hold"), 1800);
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), 1400);
    } else if (phase === "deleting") {
      if (n > 0) t = setTimeout(() => setN(n - 1), 22);
      else t = setTimeout(() => setPhase("wait"), 400);
    } else {
      t = setTimeout(() => setPhase("typing"), 500);
    }
    return () => clearTimeout(t);
  }, [n, phase, text]);

  return (
    <span className={className} aria-label={text}>
      {text.slice(0, n)}
      <span className="inline-block w-[2px] -mb-[2px] ml-[1px] h-[1.05em] align-middle bg-[#8fd9f5] animate-pulse" />
    </span>
  );
}
