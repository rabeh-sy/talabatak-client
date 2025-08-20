import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts Arabic digits (٠١٢٣٤٥٦٧٨٩) to English digits (0123456789)
 * @param text - The text containing Arabic digits
 * @returns The text with Arabic digits converted to English digits
 */
export function convertArabicDigitsToEnglish(text: string): string {
  const arabicToEnglishMap: Record<string, string> = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9'
  }
  
  return text.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (match) => arabicToEnglishMap[match] || match)
}
