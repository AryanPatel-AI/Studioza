"use client";

import React from "react";

// Native direct scrolling without artificial inertia lag
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
