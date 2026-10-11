"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Root Template - Wraps route changes with room-enter entrance animations
 * to ensure smooth visual transitions across page mounts.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("flex-1 flex flex-col will-change-[transform,opacity,filter]", "animate-room-enter")}>
      {children}
    </div>
  );
}
