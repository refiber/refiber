import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
