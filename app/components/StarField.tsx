"use client";
import { useEffect, useRef } from "react";

export default function StarField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const N = 36;
    for (let i = 0; i < N; i++) {
      const s = document.createElement("i");
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 5 + "s";
      s.style.opacity = String(0.2 + Math.random() * 0.6);
      s.style.transform = `scale(${0.4 + Math.random() * 0.9})`;
      root.appendChild(s);
    }
  }, []);

  return <div className="stars" ref={ref} aria-hidden="true" />;
}
