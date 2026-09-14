"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "flex-1 flex flex-col will-change-[transform,opacity,filter]",
        "animate-room-enter"
      )}
    >
      {children}
    </div>
  );
}
