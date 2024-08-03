import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from "date-fns"
import { es } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true, locale: es });
}

export function toSlug(str:string){
  return str.toLocaleLowerCase().replace(/ /g, "-") .replace(/[^\w-]+/g, "");
}