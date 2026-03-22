// Helper untuk menggabungkan class Tailwind dengan aman
// Contoh: cn("px-4", condition && "bg-red-500") 
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
