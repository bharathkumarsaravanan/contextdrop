import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { success } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
}

export async function handleCopy(text:string) {
    try {
      await navigator.clipboard.writeText(text);
      return {
        success: true
      }
    } catch {
      return {
        success: false
      }
    }
  }