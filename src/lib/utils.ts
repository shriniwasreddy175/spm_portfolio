import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility to merge Tailwind classes conditionally
 * Usage: cn("base-class", condition && "conditional-class")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}