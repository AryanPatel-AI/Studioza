/**
 * General Utilities & Formatters
 * Class name composition, URL slugification, byte sizing, and human-readable date representations.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind class lists safely resolving conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Converts plain text into a clean URL-friendly slug */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")      // Replace whitespace with hyphens
    .replace(/[^\w\-]+/g, "")   // Strip non-word characters
    .replace(/\-\-+/g, "-")    // Collapse multiple consecutive hyphens
    .replace(/^-+/, "")         // Trim leading hyphens
    .replace(/-+$/, "");        // Trim trailing hyphens
}

/** Formats integer bytes into human-readable units (B, KB, MB, GB, TB) */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/** Formats a date into "Jan 1, 2026" display */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "Never";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Formats a date into relative elapsed time ("just now", "5m ago", "2h ago", "3d ago") */
export function formatTimeAgo(date: Date | string): string {
  const d = new Date(date);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(d);
}
