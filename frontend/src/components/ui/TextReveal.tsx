"use client";

import { useEffect, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 100,
  stagger = 65,
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
        >
          <span
            className={`inline-block transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${wordClassName}`}
            style={{
              transform: isVisible ? "translateY(0%)" : "translateY(115%)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * stagger}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
